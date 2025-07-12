import "globals.css"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ChartPie, Trophy, User } from "lucide-react"
import Account from "~components/account"
import Stat from "~components/stat"
import Rank from "~components/rank"

const IndexPopup = () => {
  return (
    <div className="flex flex-col w-96 p-4 bg-zinc-50">
      <Tabs defaultValue="stat">
        <div className="flex gap-2 p-2 pt-0 justify-between">
          <div className="flex items-center text-lg font-bold">디지털 디톡스</div>
          <TabsList>
            <TabsTrigger value="stat">
              <ChartPie />
            </TabsTrigger>
            <TabsTrigger value="user">
              <User />
            </TabsTrigger>
            <TabsTrigger value="rank">
              <Trophy />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="stat">
          <Stat />
        </TabsContent>
        <TabsContent value="user">
          <Account />
        </TabsContent>
        <TabsContent value="rank">
          <Rank />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default IndexPopup
