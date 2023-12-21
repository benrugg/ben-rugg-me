import * as THREE from "three"
import { MathUtils } from "three"
import { useMemo, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Instance, Instances } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
import { useScreenState } from "@/app/hooks/useScreenState"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
import { randomFromArray } from "@/utils/random"
import { Vector3Array } from "@/types"

const minParticles = 30
const maxParticles = 100
const minThreeViewportAreaThreshold = 15
const maxThreeViewportAreaThreshold = 35
const scaleMin = 0.1
const scaleMax = 0.45
const yMin = -5
const yMax = 5
const zMin = -25
const zMax = -3
const overshootScreenScale = 2.3
const particleRotationSpeed = 0.5
const minParticleFloatSpeed = 0.15
const maxParticleFloatSpeed = 0.45
const possibleColors = ["#020416", "#020c16", "#070112", "#02100b"]

const AnimatedInstance = animated(Instance)

type ParticleProps = {
  position: Vector3Array
  scale: number
  color: string
  floatSpeed: number
}

function Particle(props: ParticleProps) {
  // init refs and state
  const ref = useRef<THREE.InstancedMesh>(null!)
  const [isEntering, setIsEntering] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  // const [hovered, setHovered] = useState(false)

  // get the current screen state for the Madison screen
  const { isTransitioningTo, isScreenReady } = useScreenState("madison")
  const isMadisonScreenActive = isTransitioningTo || isScreenReady

  // prepare spring animation
  const spring = useSpring({
    color: isMadisonScreenActive ? "#FFFFFF" : props.color,
    scale: isEntering || isExiting ? 0 : isMadisonScreenActive ? props.scale * 0.2 : props.scale,
    floatSpeed: isEntering || isExiting ? props.floatSpeed * 5 : props.floatSpeed,
    config: (key) => {
      if (key === "scale") {
        return {
          tension: 230,
          friction: 190,
        }
      } else if (key === "color") {
        return {
          tension: 230,
          friction: 190,
        }
      } else if (key === "floatSpeed") {
        return config.slow
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
    ref.current.position.y += delta * spring.floatSpeed.get()

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

  // create the random particle positions
  const randomParticles = useMemo(() => {
    const particles: ParticleProps[] = []
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        position: [Math.random(), Math.random(), MathUtils.randFloat(zMin, zMax)],
        scale: MathUtils.randFloat(scaleMin, scaleMax),
        color: randomFromArray(possibleColors),
        floatSpeed: MathUtils.randFloat(minParticleFloatSpeed, maxParticleFloatSpeed),
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

  return (
    <group ref={containerRef}>
      <Instances range={numParticles} limit={maxParticles}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial roughness={0.12} reflectivity={0.1} color={"white"} />

        {randomParticles.map((props, index) => {
          const position: Vector3Array = [
            (props.position[0] * threeWidth - threeWidth / 2) * overshootScreenScale,
            (props.position[1] * threeHeight - threeHeight / 2) * overshootScreenScale,
            props.position[2],
          ]

          return <Particle key={index} position={position} scale={props.scale} color={props.color} floatSpeed={props.floatSpeed} />
        })}
      </Instances>
    </group>
  )
}
