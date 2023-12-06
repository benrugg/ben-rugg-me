"use client"

import { useRef } from "react"
import { useNavigationStore } from "@/app/stores/navigationStore"
import { Canvas } from "@react-three/fiber"
import { Environment, Preload } from "@react-three/drei"
// import CameraControlsManager from "@/app/components/utils/CameraControlsManager"
import { WelcomeScreen, WelcomeScreenHtml } from "@/app/screens/WelcomeScreen"
import { CompaniesScreen, CompaniesScreenHtml } from "@/app/screens/CompaniesScreen"
import Effects from "@/app/components/Effects"

export default function Home() {
  // init refs
  const htmlContainerRef = useRef<HTMLDivElement>(null!)

  // get the current screen state
  const screen = useNavigationStore((state) => state.screen)

  return (
    <div ref={htmlContainerRef} className="fixed w-screen min-h-screen">
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
        eventSource={htmlContainerRef}
      >
        {/* <CameraControlsManager /> */}
        <Environment files="/images/polyhaven-aerodynamics_workshop_1k.hdr" />
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#050010"]} />

        <Preload all />

        <Effects />

        <WelcomeScreen />
        <CompaniesScreen />
      </Canvas>

      <WelcomeScreenHtml />
      <CompaniesScreenHtml />
    </div>
  )
}
