"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Preload, ScrollControls, Scroll } from "@react-three/drei"
// import { RaycastOnScroll } from "@/app/components/utils/RaycastOnScroll"
import { WelcomeScreen, WelcomeScreenHtml } from "@/app/screens/WelcomeScreen"
import Effects from "@/app/components/Effects"

export default function Home() {
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
