import type { YoutubeLog } from "~contents/youtube"

export type ToxType = 'Youtube' | 'Twitter' | 'Instagram'

export const ToxColor: Record<ToxType, string> = {
  Youtube: '#ff0000',
  Twitter: '#08a0e9',
  Instagram: '#dd2a7b',
}

export const DetoxColor = '#00c951'

export interface ToxData {
  type: ToxType
  s: number // secs
}

// log message when media is playing
export interface PlayLog<T = YoutubeLog> {
  type: ToxType
  log: T
}

export const tsFormatter = (value: number) => new Date(value).toLocaleDateString("ko-KR", {
  month: "short",
  day: "numeric",
})