"use client"

import * as THREE from "three"
import { MathUtils } from "three"
import { useMemo, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
import TempImage from "@/app/components/TempImage"
import TempVideo from "@/app/components/TempVideo"
import { Vector3Array } from "@/types"
// import { useControls } from "leva"

const minParticles = 100
const maxParticles = 300
const minThreeScreenAreaThreshold = 15
const maxThreeScreenAreaThreshold = 35
const zMin = -10
const zMax = 0
const overshootScreenScale = 2
const particleRotationSpeed = 0.5
const groupRotationAmount = 0.02
const groupRotationDamping = 2.75

const AnimatedInstance = animated(Instance)

function Particle(props: { position: Vector3Array }) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const spring = useSpring({
    scale: clicked ? 0.5 : 0.2,
    color: hovered ? "hotpink" : "orange",
    config: config.stiff,
  })

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta * particleRotationSpeed
    if (hovered) ref.current.rotation.y += delta * particleRotationSpeed * 2
  })

  return (
    <AnimatedInstance
      {...props}
      ref={ref}
      onClick={(event) => setClicked(!clicked)}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
      {...spring}
    />
  )
}

export default function Test() {
  const randomParticlePositions = useMemo(() => {
    const positions: Vector3Array[] = []
    for (let i = 0; i < maxParticles; i++) {
      positions.push([Math.random(), Math.random(), MathUtils.randFloat(zMin, zMax)])
    }
    return positions
  }, [])

  const containerRef = useRef<THREE.Group>(null!)
  const { width, height } = useThree((state) => state.viewport)

  const screenArea = width * height
  const numParticles = Math.round(
    MathUtils.lerp(
      minParticles,
      maxParticles,
      MathUtils.clamp(MathUtils.mapLinear(screenArea, minThreeScreenAreaThreshold, maxThreeScreenAreaThreshold, 0, 1), 0, 1),
    ),
  )

  useFrame((state, delta) => {
    containerRef.current.rotation.y = MathUtils.damp(
      containerRef.current.rotation.y,
      state.pointer.x * Math.PI * groupRotationAmount,
      groupRotationDamping,
      delta,
    )
    containerRef.current.rotation.x = MathUtils.damp(
      containerRef.current.rotation.x,
      -state.pointer.y * Math.PI * groupRotationAmount * 0.5,
      groupRotationDamping,
      delta,
    )
  })

  return (
    <>
      <ambientLight intensity={0.5} />

      <group ref={containerRef}>
        <Instances range={numParticles} limit={maxParticles}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial roughness={0.12} reflectivity={0.7} color={"white"} />

          {randomParticlePositions.map((randomPosition, index) => {
            const position: Vector3Array = [
              (randomPosition[0] * width - width / 2) * overshootScreenScale,
              (randomPosition[1] * height - height / 2) * overshootScreenScale,
              randomPosition[2],
            ]

            return <Particle key={index} position={position} />
          })}
        </Instances>
      </group>

      <group position={[0, -height * 1, 0]}>
        <TempVideo url="/video/ai-render-demo.mp4" />
      </group>
      <group position={[0, -height * 2, 1.5]}>
        <TempImage url="/images/temp-2.jpg" />
      </group>
    </>
  )
}
