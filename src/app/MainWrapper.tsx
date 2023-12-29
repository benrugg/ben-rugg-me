"use client"

import dynamic from "next/dynamic"
import { GoogleAnalytics } from "nextjs-google-analytics"
import { useNavigation } from "@/app/hooks/useNavigation"
import { useScreenStore } from "@/app/stores/screenStore"
import { useShowStaticContent } from "@/app/hooks/useShowStaticContent"
import MainLoading from "@/app/components/MainLoading"
import ReactScrollWheelHandler from "react-scroll-wheel-handler"

const Main = dynamic(() => import("@/app/Main"), {
  ssr: false,
  loading: () => <MainLoading doAnimateIn={true} />,
})

export default function MainWrapper() {
  // determine if we should show the non-static content
  const { showStaticContent } = useShowStaticContent()

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
    <>
      <GoogleAnalytics trackPageViews />
      {!showStaticContent && (
        <ReactScrollWheelHandler
          upHandler={handleSwipeUp}
          downHandler={handleSwipeDown}
          leftHandler={handleSwipeLeft}
          rightHandler={handleSwipeRight}
          timeout={300}
          className="h-[100dvh] w-screen"
        >
          <Main />
        </ReactScrollWheelHandler>
      )}
    </>
  )
}
