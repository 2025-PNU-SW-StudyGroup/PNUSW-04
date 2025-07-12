import { sendToBackground } from "@plasmohq/messaging";
import type { PlasmoCSConfig } from "plasmo"
import type { PlayLog } from "~core";

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

// init
window.addEventListener("load", () => {
  // main loop
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      sendToBackground({
        name: 'log',
        body: generateLog(),
      })
    }
  }, 1000);
}, { once: true })

export interface YoutubeLog {
  id: string
  title: string
  image: string
  channel: {
    name: string
    handle: string
    image: string
  }
  type: 'normal' | 'shorts'
}

function generateLog(): PlayLog<YoutubeLog> {
  const log: YoutubeLog = {
    id: "",
    title: "",
    image: "",
    channel: {
      name: "",
      handle: "",
      image: ""
    },
    type: "normal"
  }
  // https://www.youtube.com/watch?v=[id]
  if (location.pathname.startsWith('/watch')) {
    log.id = new URLSearchParams(location.search).get('v') ?? ''
    log.title = document.querySelector<HTMLDivElement>('#title').innerText
    const channelAnchor = document.querySelector<HTMLAnchorElement>("#channel-name a")
    log.channel.name = channelAnchor.innerText
    log.channel.handle = channelAnchor.href.split('/').pop()
    log.channel.image = document.querySelector<HTMLImageElement>("#avatar img").src
  }
  // https://www.youtube.com/shorts/[id]
  if (location.pathname.startsWith('/shorts')) {
    log.id = location.pathname.split('/')[2] ?? ''
    const titleAnchor = document.querySelector<HTMLAnchorElement>(`a[href="https://www.youtube.com/shorts/${log.id}"][title]`)
    log.title = titleAnchor.innerText
    const channelWrapper = titleAnchor.closest("#reel-video-renderer").querySelector('.ytReelChannelBarViewModelHost')
    log.channel.name = channelWrapper.querySelector('a').innerText
    log.channel.handle = log.channel.name
    log.channel.image = channelWrapper.querySelector('img').src
    log.type = 'shorts'
  }
  log.image = `https://i.ytimg.com/vi/${log.id}/hqdefault.jpg`
  return {
    type: 'Youtube',
    log,
  }
}