"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Preload, OrbitControls } from "@react-three/drei"

import dynamic from "next/dynamic"

const Test = dynamic(() => import("@/app/components/Test"), { ssr: false })

export default function Home() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      shadows={"soft"}
      camera={{ position: [6, 4, -12], fov: 50 }}
    >
      <Test />
      <Environment files="/images/polyhaven-aerodynamics_workshop_1k.hdr" />
      <OrbitControls makeDefault />
      <Preload all />
    </Canvas>
  )
}
