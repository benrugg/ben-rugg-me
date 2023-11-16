"use client"

import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame, ThreeElements } from "@react-three/fiber"
import { Backdrop, SoftShadows } from "@react-three/drei"
import { useControls } from "leva"

const rotationSpeed = 0.5

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * rotationSpeed
    if (hovered) ref.current.rotation.y += delta * rotationSpeed * 2
  })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial roughness={0.12} reflectivity={0.7} color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

const Light = () => {
  const directionalCtl = useControls("Directional Light", {
    position: {
      x: -1,
      y: 3,
      z: -4.4,
    },
    intensity: 4.0,
    castShadow: true,
  })

  return (
    <directionalLight
      position={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]}
      intensity={directionalCtl.intensity}
      castShadow={directionalCtl.castShadow}
    />
  )
}

export default function Test() {
  return (
    <>
      <color attach="background" args={["#eeccff"]} />
      <ambientLight intensity={0.5} />
      <Light />
      <Box position={[-1.2, 0, 0]} castShadow />
      <Box position={[1.2, 0, 0]} castShadow />
      <Backdrop
        floor={1.4} // Stretches the floor segment, 0.25 by default
        segments={20} // Mesh-resolution, 20 by default
        receiveShadow={true} // Whether to receive shadows, false by default
        scale={[20, 10, 5]}
        position={[0, -1, 2]}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial roughness={0.7} color="#eeeeff" side={THREE.DoubleSide} />
      </Backdrop>
      <SoftShadows />
    </>
  )
}
