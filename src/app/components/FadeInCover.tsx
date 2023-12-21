import { useLayoutEffect, useRef } from "react"

export default function FadeInCover() {
  const ref = useRef<HTMLDivElement>(null!)

  useLayoutEffect(() => {
    ref.current.classList.remove("fade-out")

    setTimeout(() => {
      if (!ref.current || !ref.current.classList) {
        return
      }

      ref.current.classList.add("fade-out-medium")
    }, 66)
  })

  return <div ref={ref} className="h-[100dvh] w-screen absolute z-50 bg-black pointer-events-none" />
}
