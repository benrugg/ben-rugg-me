"use client"

import { useNavigation } from "@/app/hooks/useNavigation"
import { useScreenStore } from "@/app/stores/screenStore"
import { Canvas } from "@react-three/fiber"
import { Environment, Preload, ScrollControls, Scroll } from "@react-three/drei"
// import { RaycastOnScroll } from "@/app/components/utils/RaycastOnScroll"
import CameraControlsManager from "@/app/components/utils/CameraControlsManager"
import ScrollControllsManager from "@/app/components/utils/ScrollControllsManager"
import { WelcomeScreen, WelcomeScreenHtml } from "@/app/screens/WelcomeScreen"
import { CompaniesScreen, CompaniesScreenHtml } from "@/app/screens/CompaniesScreen"
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

  // get the current screen
  const screen = useScreenStore((state) => state.screen)

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
        <CameraControlsManager />
        <Environment files="/images/polyhaven-aerodynamics_workshop_1k.hdr" />
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#050010"]} />

        <Preload all />

        <Effects />

        <ScrollControls damping={0.1} enabled={screen !== "welcome"} pages={3} distance={0.5}>
          {/* <RaycastOnScroll /> */}
          <ScrollControllsManager />
          <Effects />

          <Scroll>
            <WelcomeScreen />
            {screen === "companies" && <CompaniesScreen />}
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
