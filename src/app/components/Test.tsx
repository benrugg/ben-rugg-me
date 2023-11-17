"use client"

import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame, useThree, ThreeElements } from "@react-three/fiber"
// import { useControls } from "leva"

const numParticles = 300
const zMin = 0
const zMax = 10
const overshootScreenScale = 2
const rotationSpeed = 0.5

function Particle(props: ThreeElements["mesh"] & { targetPosition: [x: number, y: number, z: number] }) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const { width, height } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * rotationSpeed
    if (hovered) ref.current.rotation.y += delta * rotationSpeed * 2
  })

  const position: [x: number, y: number, z: number] = [
    (props.targetPosition[0] * width - width / 2) * overshootScreenScale,
    (props.targetPosition[1] * height - height / 2) * overshootScreenScale,
    props.targetPosition[2],
  ]

  return (
    <mesh
      {...props}
      position={position}
      ref={ref}
      scale={clicked ? 0.3 : 0.2}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
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
  const randomPositions = () => {
    const positions: [x: number, y: number, z: number][] = []
    for (let i = 0; i < numParticles; i++) {
      positions.push([Math.random(), Math.random(), THREE.MathUtils.randFloat(zMin, zMax)])
    }
    return positions
  }

  const { height } = useThree((state) => state.viewport)

  return (
    <>
      <ambientLight intensity={0.5} />

      {randomPositions().map((position, index) => (
        <Particle key={index} targetPosition={position} castShadow />
      ))}

      <Temp position={[0, -height * 1, 0]} />
      <Temp position={[0, -height * 2, 2]} />
    </>
  )
}
