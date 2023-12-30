import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { AdaptiveDpr, Environment, Stats } from "@react-three/drei"
// import CameraControlsManager from "@/app/components/utils/CameraControlsManager"
import { WelcomeScreen, WelcomeScreenHtml } from "@/app/components/screens/WelcomeScreen"
import { CompaniesAndProjectsScreen, CompaniesAndProjectsScreenHtml } from "@/app/components/screens/CompaniesAndProjectsScreen"
import { AboutScreenHtml } from "@/app/components/screens/AboutScreen"
import { ContactScreenHtml } from "@/app/components/screens/ContactScreen"
import { FullStackEngineerScreenHtml } from "@/app/components/screens/FullStackEngineerScreen"
import { MadisonScreen, MadisonScreenHtml } from "@/app/components/screens/MadisonScreen"
import Dust from "@/app/components/Dust"
import Particles from "@/app/components/Particles"
import Effects from "@/app/components/Effects"
import MainLoading from "@/app/components/MainLoading"
import FadeInCover from "@/app/components/FadeInCover"
import { useHasQueryFlag } from "@/app/hooks/useHasQueryFlag"

export default function Main() {
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
          <AdaptiveDpr />
          <Environment files="/images/textures/polyhaven-aerodynamics_workshop_tiny.hdr" />
          <ambientLight intensity={0.5} />
          <color attach="background" args={["#060012"]} />

          <Effects />

          <WelcomeScreen />

          <Suspense fallback={null}>
            <CompaniesAndProjectsScreen screen="companies" />
          </Suspense>
          <Suspense fallback={null}>
            <CompaniesAndProjectsScreen screen="projects" />
          </Suspense>

          <Dust />
          <Particles />

          <MadisonScreen />

          {showStats && <Stats className="threeStats" />}
        </Canvas>

        <WelcomeScreenHtml />
        <CompaniesAndProjectsScreenHtml screen="companies" />
        <CompaniesAndProjectsScreenHtml screen="projects" />
        <AboutScreenHtml />
        <ContactScreenHtml />
        <FullStackEngineerScreenHtml />
        <MadisonScreenHtml />

        <FadeInCover />
      </div>
    </Suspense>
  )
}
