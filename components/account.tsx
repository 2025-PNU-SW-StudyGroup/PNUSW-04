import type { Provider, User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { supabase } from "~core/supabase"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

export interface Account {
  user: string
  name: string
}

export default function Account({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage({
      area: "local"
    })
  })

  const [account, setAccount] = useStorage<Account>({
    key: "account",
    instance: new Storage({
      area: "local"
    })
  })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [name, setName] = useState("")
  const [isUpdatingName, setIsUpdatingName] = useState(false)

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }

      if (!!data.session) {
        setUser(data.session.user)
        const account = await supabase.from('account').select().eq("user", data.session.user.id)
        if (error) {
          console.error(error)
          return
        }
        if (account.data.length === 1) {
          setAccount(account.data[0])
          setName(account.data[0].name)
        }
      }
    }

    init()
  }, [])

  const handleLogin = async (
    type: "LOGIN" | "SIGNUP",
    email: string,
    password: string
  ) => {
    try {
      const {
        error,
        data: { user }
      } =
        type === "LOGIN"
          ? await supabase.auth.signInWithPassword({
            email,
            password
          })
          : await supabase.auth.signUp({ email, password })

      if (error) {
        alert("Error with auth: " + error.message)
      } else if (!user) {
        alert("Signup successful!")
      } else {
        setUser(user)
      }
    } catch (error) {
      console.log("error", error)
      alert(error.error_description || error)
    }
  }

  const handleOAuthLogin = async (provider: Provider, scopes = "email") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        scopes,
        redirectTo: location.href
      }
    })
  }

  if (!user) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>
              이메일과 비밀번호를 입력하여 로그인 할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                  {/*
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    비밀번호를 잊으셨나요?
                  </a>
                  */}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin("LOGIN", email, password)
                    }
                  }}
                  required
                />
              </div>
              <Button
                className="w-full"
                onClick={(e) => {
                  handleLogin("LOGIN", email, password)
                }}
              >
                로그인
              </Button>
              {/* 
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  handleOAuthLogin('google')
                }}
              >
                Google로 로그인 하기
              </Button>
              */}
            </div>
            <div className="mt-4 text-center text-sm">
              계정이 없으신가요?{" "}
              <button
                className="underline underline-offset-4"
                onClick={(e) => {
                  handleLogin("SIGNUP", email, password)
                }}
              >
                회원가입
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">계정</CardTitle>
          <CardDescription>
            내 계정
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                readOnly
                value={user.email}
              />
            </div>
            {account && (
              <div className="grid gap-2">
                <Label htmlFor="name">이름</Label>
                <div className="flex gap-1">
                  <Input
                    id="name"
                    value={name || account?.name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="grow"
                  />
                  <Button
                    className="shrink-0"
                    disabled={account.name === name}
                    onClick={async () => {
                      setIsUpdatingName(true)
                      const { data, error } = await supabase.from("account").update({ name }).eq("user", account.user).select()
                      if (data.length === 1 && !error) {
                        setAccount(data[0])
                      } else {
                        setName(account.name)
                      }
                      setIsUpdatingName(false)
                    }}
                  >
                    업데이트{isUpdatingName && <LoaderCircle className="animate-spin" />}
                  </Button>
                </div>
              </div>
            )}
            <Button
              className="w-full"
              onClick={() => {
                supabase.auth.signOut()
                setUser(null)
              }}
            >
              로그아웃
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
