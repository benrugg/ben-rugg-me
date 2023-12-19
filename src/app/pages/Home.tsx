"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Preload, Stats } from "@react-three/drei"
// import CameraControlsManager from "@/app/components/utils/CameraControlsManager"
import { WelcomeScreen, WelcomeScreenHtml } from "@/app/screens/WelcomeScreen"
import { CompaniesAndProjectsScreen, CompaniesAndProjectsScreenHtml } from "@/app/screens/CompaniesAndProjectsScreen"
import Dust from "@/app/components/Dust"
import Particles from "@/app/components/Particles"
import Effects from "@/app/components/Effects"
import MainLoading from "@/app/components/MainLoading"
import { useHasQueryFlag } from "@/app/hooks/useHasQueryFlag"

export default function Home() {
  // init refs
  const htmlContainerRef = useRef<HTMLDivElement>(null!)

  // get debug search params
  const showStats = useHasQueryFlag("debug")

  return (
    <Suspense fallback={<MainLoading doAnimateIn={false} />}>
      <div ref={htmlContainerRef} className="fixed w-screen h-[100dvh]">
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
          }}
          // shadows={"soft"}
          camera={{ position: [0, 0, 5], fov: 50 }}
          eventSource={htmlContainerRef}
        >
          {/* <CameraControlsManager /> */}
          <Environment files="/images/textures/polyhaven-aerodynamics_workshop_tiny.hdr" />
          <ambientLight intensity={0.5} />
          <color attach="background" args={["#050010"]} />

          <Preload all />

          <Effects />

          <Suspense fallback={null}>
            <WelcomeScreen />
          </Suspense>
          <Suspense fallback={null}>
            <CompaniesAndProjectsScreen screen="companies" />
          </Suspense>
          <Suspense fallback={null}>
            <CompaniesAndProjectsScreen screen="projects" />
          </Suspense>

          <Dust />
          <Particles />

          {showStats && <Stats className="threeStats" />}
        </Canvas>

        <WelcomeScreenHtml />
        <CompaniesAndProjectsScreenHtml screen="companies" />
        <CompaniesAndProjectsScreenHtml screen="projects" />
      </div>
    </Suspense>
  )
}
