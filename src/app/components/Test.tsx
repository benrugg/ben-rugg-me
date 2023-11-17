"use client"

import * as THREE from "three"
import { MathUtils } from "three"
import { useMemo, useRef, useState } from "react"
import { useFrame, useThree, ThreeElements } from "@react-three/fiber"
import { Instance, Instances } from "@react-three/drei"
// import { useControls } from "leva"

const numParticles = 300
const zMin = 0
const zMax = 10
const overshootScreenScale = 2
const particleRotationSpeed = 0.5
const groupRotationAmount = 0.02
const groupRotationDamping = 2.75

function Particle(props: { position: [x: number, y: number, z: number] }) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const color = new THREE.Color()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * particleRotationSpeed
    if (hovered) ref.current.rotation.y += delta * particleRotationSpeed * 2
    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, clicked ? 0.5 : 0.2, 0.1)
    // @ts-ignore: .color is not in the type definition
    ref.current.color.set(hovered ? "hotpink" : "orange")
    // ref.current.color.lerp(color.set(hovered ? "hotpink" : "orange"), 0.03)
  })

  return (
    <Instance
      {...props}
      ref={ref}
      scale={0.2}
      onClick={(event) => setClicked(!clicked)}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
    />
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
      positions.push([Math.random(), Math.random(), MathUtils.randFloat(zMin, zMax)])
    }
    return positions
  }, [])

  const containerRef = useRef<THREE.Group>(null!)
  const { width, height } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    containerRef.current.rotation.y = MathUtils.damp(
      containerRef.current.rotation.y,
      state.pointer.x * Math.PI * groupRotationAmount,
      groupRotationDamping,
      delta,
    )
    containerRef.current.rotation.x = MathUtils.damp(
      containerRef.current.rotation.x,
      state.pointer.y * Math.PI * groupRotationAmount * 0.5,
      groupRotationDamping,
      delta,
    )
  })

  return (
    <>
      <ambientLight intensity={0.5} />

      <group ref={containerRef}>
        <Instances range={randomParticlePositions.length}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial roughness={0.12} reflectivity={0.7} color={"white"} />

          {randomParticlePositions.map((randomPosition, index) => {
            const position: [x: number, y: number, z: number] = [
              (randomPosition[0] * width - width / 2) * overshootScreenScale,
              (randomPosition[1] * height - height / 2) * overshootScreenScale,
              randomPosition[2],
            ]

            return <Particle key={index} position={position} />
          })}
        </Instances>
      </group>

      <Temp position={[0, -height * 1, 0]} />
      <Temp position={[0, -height * 2, 2]} />
    </>
  )
}
