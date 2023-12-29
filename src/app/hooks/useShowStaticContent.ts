"use client"

import { useState, useLayoutEffect } from "react"
import { isBot } from "@/utils/is-bot"

export const useShowStaticContent = () => {
  const [showStaticContent, setShowStaticContent] = useState(false)
  const staticContentCSS = showStaticContent ? "" : "hidden"

  useLayoutEffect(() => {
    if (isBot()) {
      setShowStaticContent(true)
    }
  }, [])

  return { showStaticContent, staticContentCSS }
}
