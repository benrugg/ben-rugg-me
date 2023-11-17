"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Preload, OrbitControls, ScrollControls, Scroll } from "@react-three/drei"

import dynamic from "next/dynamic"

const Test = dynamic(() => import("@/app/components/Test"), { ssr: false })

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
        shadows={"soft"}
        camera={{ position: [0, 0, -5], fov: 50 }}
      >
        <Environment files="/images/polyhaven-aerodynamics_workshop_1k.hdr" />
        <color attach="background" args={["#f0d5ff"]} />
        {/* <OrbitControls makeDefault scale={1} /> */}
        <Preload all />
        <ScrollControls damping={0.1} pages={10} distance={0.5}>
          <Scroll>
            <Test />
          </Scroll>

          <Scroll html>
            <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute">
              <h1 className="text-6xl font-bold">Hello World</h1>
              <p className="mt-3 text-2xl">Scroll to view projects</p>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute" style={{ top: "100vh" }}>
              <h1 className="text-6xl font-bold">Page 2</h1>
              <p className="mt-3 text-2xl">Projects...</p>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute" style={{ top: "200vh" }}>
              <h1 className="text-6xl font-bold">Page 3</h1>
              <p className="mt-3 text-2xl">Projects...</p>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  )
}
