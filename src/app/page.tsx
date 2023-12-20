"use client"

import dynamic from "next/dynamic"
import { useNavigation } from "@/app/hooks/useNavigation"
import { useScreenStore } from "@/app/stores/screenStore"
import MainLoading from "@/app/components/MainLoading"
import ReactScrollWheelHandler from "react-scroll-wheel-handler"

const Main = dynamic(() => import("@/app/main"), {
  ssr: false,
  loading: () => <MainLoading doAnimateIn={true} />,
})

export default function Page() {
  // when the route is changed, set the screen, either immediately
  // or with a delay
  useNavigation({
    on: {
      routeChanged: ({ pathname }) => {
        if (!pathname) return
        let screen = pathname.replace("/", "") || "welcome"
        useScreenStore.getState().setScreen(screen)
      },
    },
  })

  // when swipes occur, increment/decrement the section index
  const handleSwipeUp = () => {
    useScreenStore.getState().decrementSectionIndex()
  }

  const handleSwipeDown = () => {
    useScreenStore.getState().incrementSectionIndex()
  }

  const handleSwipeLeft = () => {
    useScreenStore.getState().incrementSlideIndex()
  }

  const handleSwipeRight = () => {
    useScreenStore.getState().decrementSlideIndex()
  }

  return (
    <main>
      <ReactScrollWheelHandler
        upHandler={handleSwipeUp}
        downHandler={handleSwipeDown}
        leftHandler={handleSwipeLeft}
        rightHandler={handleSwipeRight}
        timeout={300}
        // pauseListeners={true}
        className="h-[100dvh] w-screen"
      >
        <Main />
      </ReactScrollWheelHandler>
    </main>
  )
}
