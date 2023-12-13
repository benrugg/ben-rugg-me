"use client"

import dynamic from "next/dynamic"
import { useNavigation } from "@/app/hooks/useNavigation"
import { useScreenStore } from "@/app/stores/screenStore"
import ReactScrollWheelHandler from "react-scroll-wheel-handler"

const Home = dynamic(() => import("@/app/pages/Home"), { ssr: false })

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

  return (
    <main className="min-h-screen w-screen">
      <ReactScrollWheelHandler
        upHandler={handleSwipeUp}
        downHandler={handleSwipeDown}
        timeout={300}
        // pauseListeners={true}
        className="min-h-screen w-screen"
      >
        <Home />
      </ReactScrollWheelHandler>
    </main>
  )
}
