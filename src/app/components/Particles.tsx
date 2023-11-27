import * as THREE from "three"
import { MathUtils } from "three"
import { useEffect, useMemo, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
import { randomFromArray } from "@/utils/random"
import { Vector3Array } from "@/types"
// import { useControls } from "leva"

const minParticles = 100
const maxParticles = 400
const minThreeViewportAreaThreshold = 15
const maxThreeViewportAreaThreshold = 35
const scaleMin = 0.1
const scaleMax = 0.14
const yMin = -5
const yMax = 5
const zMin = -15
const zMax = 0
const overshootScreenScale = 2.3
const particleRotationSpeed = 0.5
const particleFloatSpeed = 0.3
const possibleColors = ["#091056", "#093156", "#2b0956", "#27030b"]

const AnimatedInstance = animated(Instance)

type ParticleProps = {
  position: Vector3Array
  scale: number
  color: string
}

function Particle(props: ParticleProps) {
  const ref = useRef<THREE.InstancedMesh>(null!)
  const [isEntering, setIsEntering] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  // const [hovered, setHovered] = useState(false)

  const spring = useSpring({
    // color: hovered ? [0, 0, 0] : [0, 155, 125],
    scale: isEntering || isExiting ? 0 : props.scale,
    config: (key) => {
      if (key === "scale") {
        return config.molasses
      } else {
        return config.stiff
      }
    },
  })

  useFrame((state, delta) => {
    // if a lot of time has passed, don't do anything (this happens when the tab is inactive)
    if (delta > 0.5) {
      return
    }

    // as soon as the particle is entering, set the flag back to false
    if (isEntering) {
      setIsEntering(false)
    }

    // rotate
    ref.current.rotation.x -= delta * particleRotationSpeed

    // handle hover
    // if (hovered) ref.current.rotation.y += delta * particleRotationSpeed * 2

    // float
    ref.current.position.y += delta * particleFloatSpeed

    // if the particle is too high, exit it
    if (ref.current.position.y > yMax) {
      setIsExiting(true)
    }

    // if the particle has exited, put it back at the bottom and reset the flag
    if (isExiting && spring.scale.get() < 0.001) {
      ref.current.position.y = yMin
      setIsExiting(false)
      setIsEntering(true)
    }
  })

  return (
    <AnimatedInstance {...props} ref={ref} /*onPointerOver={(event) => setHovered(true)} onPointerOut={(event) => setHovered(false)}*/ {...spring} />
  )
}

export default function Particles() {
  // init ref and state
  const containerRef = useRef<THREE.Group>(null!)
  const [shouldDisplay, setShouldDisplay] = useState(false)

  // create the random particle positions
  const randomParticles = useMemo(() => {
    const particles: ParticleProps[] = []
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        position: [Math.random(), Math.random(), MathUtils.randFloat(zMin, zMax)],
        scale: MathUtils.randFloat(scaleMin, scaleMax),
        color: randomFromArray(possibleColors),
      })
    }
    return particles
  }, [])

  // rotate the group on pointer move
  useRotationOnPointerMove(containerRef)

  // get the screen size (in three js units)
  const {
    viewport: { width: threeWidth, height: threeHeight },
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

  // show the particles after the first render
  // NOTE: this is a hack to prevent the particles from disappearing during scroll
  useEffect(() => {
    setShouldDisplay(true)
  }, [])

  return (
    <group ref={containerRef}>
      {shouldDisplay && (
        <Instances range={numParticles} limit={maxParticles}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial roughness={0.12} reflectivity={0.7} color={"white"} />

          {randomParticles.map((props, index) => {
            const position: Vector3Array = [
              (props.position[0] * threeWidth - threeWidth / 2) * overshootScreenScale,
              (props.position[1] * threeHeight - threeHeight / 2) * overshootScreenScale,
              props.position[2],
            ]

            return <Particle key={index} position={position} scale={props.scale} color={props.color} />
          })}
        </Instances>
      )}
    </group>
  )
}
