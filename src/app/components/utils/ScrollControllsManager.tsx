import { useEffect } from "react"
import { useScreenStore } from "@/app/stores/screenStore"
import { useScroll } from "@react-three/drei"

export default function ScrollControllsManager() {
  // get the current screen
  const screen = useScreenStore((state) => state.screen)

  // get the scroll data
  const scroll = useScroll()

  // when the screen is changed, scroll to the top
  useEffect(() => {
    if (scroll && scroll.el) {
      scroll.el.scrollTo({ top: 0 })
    }
  }, [screen, scroll])

  return null
}
