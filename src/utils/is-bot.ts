"use client"

import { isbot } from "isbot"

export const isBot = () => {
  return isbot(navigator.userAgent)
}
