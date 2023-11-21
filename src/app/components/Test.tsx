"use client"

import * as THREE from "three"
import { MathUtils } from "three"
import { useMemo, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
import FloatingImage from "@/app/components/FloatingImage"
import FloatingVideo from "@/app/components/FloatingVideo"
import { Vector3Array } from "@/types"
// import { useControls } from "leva"

const minParticles = 100
const maxParticles = 300
const minThreeViewportAreaThreshold = 15
const maxThreeViewportAreaThreshold = 35
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
  // init ref
  const containerRef = useRef<THREE.Group>(null!)

  // create the random particle positions
  const randomParticlePositions = useMemo(() => {
    const positions: Vector3Array[] = []
    for (let i = 0; i < maxParticles; i++) {
      positions.push([Math.random(), Math.random(), MathUtils.randFloat(zMin, zMax)])
    }
    return positions
  }, [])

  // get the screen size (in three js units and pixels)
  const {
    viewport: { width: threeWidth, height: threeHeight },
    size: screenSize,
  } = useThree()

  // calculate the number of particles to render based on the viewport area
  const viewportArea = threeWidth * threeHeight
  const numParticles = Math.round(
    MathUtils.lerp(
      minParticles,
      maxParticles,
      MathUtils.clamp(MathUtils.mapLinear(viewportArea, minThreeViewportAreaThreshold, maxThreeViewportAreaThreshold, 0, 1), 0, 1),
    ),
  )

  // calculate the width of images/videos based on the screen size
  const desiredPixelWidth = Math.min(screenSize.width, 1200)

  // rotate the group on pointer move
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
              (randomPosition[0] * threeWidth - threeWidth / 2) * overshootScreenScale,
              (randomPosition[1] * threeHeight - threeHeight / 2) * overshootScreenScale,
              randomPosition[2],
            ]

            return <Particle key={index} position={position} />
          })}
        </Instances>
      </group>

      <group position={[0, -threeHeight * 1, 0]}>
        <FloatingVideo url="/video/ai-render-demo.mp4" desiredPixelWidth={desiredPixelWidth} />
      </group>
      <group position={[0, -threeHeight * 2, 1.5]}>
        <FloatingImage url="/images/temp-2.jpg" desiredPixelWidth={desiredPixelWidth} />
      </group>
    </>
  )
}
