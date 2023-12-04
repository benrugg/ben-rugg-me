"use client"

import { useNavigation } from "@/app/hooks/useNavigation"
import { useScreenStore } from "@/app/stores/screenStore"
import { Canvas } from "@react-three/fiber"
import { Environment, Preload, ScrollControls, Scroll } from "@react-three/drei"
// import { RaycastOnScroll } from "@/app/components/utils/RaycastOnScroll"
// import CameraControlsManager from "@/app/components/utils/CameraControlsManager"
import ScrollControllsManager from "@/app/components/utils/ScrollControllsManager"
import { WelcomeScreen, WelcomeScreenTransition, WelcomeScreenHtml } from "@/app/screens/WelcomeScreen"
import { CompaniesScreen, CompaniesScreenTransition, CompaniesScreenHtml } from "@/app/screens/CompaniesScreen"
import Effects from "@/app/components/Effects"

export default function Home() {
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

  // get the current screen state
  const { screen, isTransitioning, numPages } = useScreenStore()

  // determine if we should allow scrolling
  const isScrollingEnabled = screen !== "welcome" && !isTransitioning

  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
        // shadows={"soft"}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* <CameraControlsManager /> */}
        <Environment files="/images/polyhaven-aerodynamics_workshop_1k.hdr" />
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#050010"]} />

        <Preload all />

        <Effects />

        <ScrollControls damping={0.1} enabled={isScrollingEnabled} pages={numPages} distance={0.5}>
          {/* <RaycastOnScroll /> */}
          <ScrollControllsManager />
          <Effects />

          <Scroll>
            <WelcomeScreenTransition>
              <WelcomeScreen />
            </WelcomeScreenTransition>
            <CompaniesScreenTransition>
              <CompaniesScreen />
            </CompaniesScreenTransition>
          </Scroll>

          <Scroll html>
            <WelcomeScreenHtml />
            {screen === "companies" && <CompaniesScreenHtml />}
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}
