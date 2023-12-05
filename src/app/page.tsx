"use client"

import dynamic from "next/dynamic"
import { useNavigation } from "@/app/hooks/useNavigation"
import { useNavigationStore } from "@/app/stores/navigationStore"
import ReactScrollWheelHandler from "react-scroll-wheel-handler"
import { use } from "react"

const Home = dynamic(() => import("@/app/pages/Home"), { ssr: false })

export default function Page() {
  // when the route is changed, set the screen, either immediately
  // or with a delay
  useNavigation({
    on: {
      routeChanged: ({ pathname }) => {
        if (!pathname) return
        let screen = pathname.replace("/", "") || "welcome"
        useNavigationStore.getState().setScreen(screen)
      },
    },
  })

  // when swipes occur, increment/decrement the section index
  const handleSwipeUp = () => {
    useNavigationStore.getState().decrementSectionIndex()
  }

  const handleSwipeDown = () => {
    useNavigationStore.getState().incrementSectionIndex()
  }

  return (
    <main className="min-h-screen w-screen">
      <ReactScrollWheelHandler upHandler={handleSwipeUp} downHandler={handleSwipeDown} timeout={200} className="min-h-screen w-screen">
        <Home />
      </ReactScrollWheelHandler>
    </main>
  )
}
