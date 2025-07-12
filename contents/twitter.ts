import { sendToBackground } from "@plasmohq/messaging";
import type { PlasmoCSConfig } from "plasmo"
import type { PlayLog } from "~core";

export const config: PlasmoCSConfig = {
  matches: ["https://x.com/*"]
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

export interface TwitterLog {
  
}

function generateLog(): PlayLog<TwitterLog> {
  const log: TwitterLog = {}
  return {
    type: 'Twitter',
    log,
  }
}