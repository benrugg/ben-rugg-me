"use client"

import { useNavigation } from "@/app/hooks/useNavigation"
import { useScreenStore } from "@/app/stores/screenStore"
import { Canvas } from "@react-three/fiber"
import { Environment, Preload, ScrollControls, Scroll } from "@react-three/drei"
// import { RaycastOnScroll } from "@/app/components/utils/RaycastOnScroll"
import CameraControlsWrapper from "@/app/components/CameraControlsWrapper"
import { WelcomeScreen, WelcomeScreenHtml } from "@/app/screens/WelcomeScreen"
import Effects from "@/app/components/Effects"

const delayBeforeSettingScreen = 1500

export default function Home() {
  // when the route is changed, set the screen, either immediately
  // or with a delay
  useNavigation({
    on: {
      routeChanged: ({ pathname }) => {
        if (!pathname) return

        let screen = pathname.replace("/", "") || "welcome"
        // TODO: later, probably time this to after we've loaded and started rendering
        if (performance.now() > delayBeforeSettingScreen) {
          useScreenStore.getState().setScreen(screen)
        } else {
          setTimeout(() => {
            useScreenStore.getState().setScreen(screen)
          }, delayBeforeSettingScreen)
        }
      },
    },
  })

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
        <CameraControlsWrapper />
        <Environment files="/images/polyhaven-aerodynamics_workshop_1k.hdr" />
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#050010"]} />

        <Preload all />

        <Effects />

        <ScrollControls damping={0.1} pages={0} distance={0.5}>
          {/* <RaycastOnScroll /> */}
          <Effects />

          <Scroll>
            <WelcomeScreen />
          </Scroll>

          <Scroll html>
            <WelcomeScreenHtml />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}
