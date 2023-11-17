"use client"

import * as THREE from "three"
import { useMemo, useRef, useState } from "react"
import { useFrame, useThree, ThreeElements } from "@react-three/fiber"
// import { useControls } from "leva"

const numParticles = 300
const zMin = 0
const zMax = 10
const overshootScreenScale = 2
const rotationSpeed = 0.5

function Particle(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * rotationSpeed
    if (hovered) ref.current.rotation.y += delta * rotationSpeed * 2
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0.3 : 0.2}
      onClick={(event) => setClicked(!clicked)}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial roughness={0.12} reflectivity={0.7} color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

function Temp(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props} scale={0.3}>
      <torusKnotGeometry args={[1, 0.4, 100, 16]} />
      <meshPhysicalMaterial roughness={0.12} reflectivity={0.7} color={"lightgreen"} />
    </mesh>
  )
}

export default function Test() {
  const randomParticlePositions = useMemo(() => {
    const positions: [x: number, y: number, z: number][] = []
    for (let i = 0; i < numParticles; i++) {
      positions.push([Math.random(), Math.random(), THREE.MathUtils.randFloat(zMin, zMax)])
    }
    return positions
  }, [])

  const { width, height } = useThree((state) => state.viewport)

  return (
    <>
      <ambientLight intensity={0.5} />

      {randomParticlePositions.map((randomPosition, index) => {
        const position: [x: number, y: number, z: number] = [
          (randomPosition[0] * width - width / 2) * overshootScreenScale,
          (randomPosition[1] * height - height / 2) * overshootScreenScale,
          randomPosition[2],
        ]

        return <Particle key={index} position={position} castShadow />
      })}

      <Temp position={[0, -height * 1, 0]} />
      <Temp position={[0, -height * 2, 2]} />
    </>
  )
}
