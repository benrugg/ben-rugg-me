"use client"

import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame, useThree, ThreeElements } from "@react-three/fiber"
import { Backdrop, SoftShadows } from "@react-three/drei"
import { useControls } from "leva"

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

// const Light = () => {
//   const directionalCtl = useControls("Directional Light", {
//     position: {
//       x: -1,
//       y: 3,
//       z: -4.4,
//     },
//     intensity: 4.0,
//     castShadow: true,
//   })

//   return (
//     <directionalLight
//       position={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]}
//       intensity={directionalCtl.intensity}
//       castShadow={directionalCtl.castShadow}
//     />
//   )
// }

export default function Test() {
  const randomPositions = () => {
    const positions: [x: number, y: number, z: number][] = []
    for (let i = 0; i < numParticles; i++) {
      positions.push([Math.random(), Math.random(), THREE.MathUtils.randFloat(zMin, zMax)])
    }
    return positions
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <Light /> */}
      {randomPositions().map((position, index) => (
        <Particle key={index} targetPosition={position} castShadow />
      ))}
      {/* <Particle position={[-1.2, 0, 20]} castShadow /> */}
      {/* <Particle position={[1.2, 0, 20]} castShadow /> */}
      {/* <Backdrop
        floor={1.4} // Stretches the floor segment, 0.25 by default
        segments={20} // Mesh-resolution, 20 by default
        receiveShadow={true} // Whether to receive shadows, false by default
        scale={[20, 10, 5]}
        position={[0, -1, 22]}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial roughness={0.7} color="#eeeeff" side={THREE.DoubleSide} />
      </Backdrop> */}
      {/* <SoftShadows /> */}
    </>
  )
}
