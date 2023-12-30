import { isbot } from "isbot"

export const isBot = () => {
  if (typeof navigator === "undefined") return false
  return isbot(navigator.userAgent)
}
