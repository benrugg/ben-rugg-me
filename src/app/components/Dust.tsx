import * as THREE from "three"
import { MathUtils, UniformsUtils } from "three"
import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Point, Points, useTexture } from "@react-three/drei"
import { makeNoise2D } from "fast-simplex-noise"
import { DustShader } from "@/shaders/DustShader"
import type { Vector3Array } from "@/types"

const maxParticles = 2000
const zMin = -7
const zMax = 4
const xMin = -1.3
const xMax = 1.3
const yMin = -1.3
const yMax = 1.3
const scaleMin = 0.4
const scaleMax = 1.1
const floatSpeedMin = 0.03
const floatSpeedMax = 0.06
const noiseMovementStrength = 0.036

type DustProps = {
  position: Vector3Array
  scale: number
  floatSpeed: number
}

export default function Dust() {
  // init refs
  const pointsRef = useRef<THREE.Points>(null!)

  // create the initial particles
  const particles = useMemo(() => {
    const particles: DustProps[] = []
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        position: [MathUtils.randFloat(xMin, xMax), MathUtils.randFloat(yMin, yMax), MathUtils.randFloat(zMin, zMax)],
        scale: MathUtils.randFloat(scaleMin, scaleMax),
        floatSpeed: MathUtils.randFloat(floatSpeedMin, floatSpeedMax),
      })
    }
    return particles
  }, [])

  // initialize the perlin noise that will drive the particle animation
  const perlinNoise = useMemo(() => {
    return makeNoise2D()
  }, [])

  // load the texture
  const pointTexture = useTexture("/images/textures/dust-particle.png")

  // create the color
  const color = useMemo(() => {
    return new THREE.Color(0x5d7d7a)
  }, [])

  // get the screen size (in three js units)
  const {
    viewport: { width: threeWidth, height: threeHeight },
    // pointer,
  } = useThree()

  // animate the particles
  useFrame((state, delta) => {
    // if a lot of time has passed, don't do anything (this happens when the tab is inactive)
    if (delta > 0.5) {
      return
    }

    // get increasing time
    const time = state.clock.getElapsedTime() / 100

    particles.forEach((particle, index) => {
      // move the particle up
      particle.position[1] += particle.floatSpeed * delta

      // move the particle with the perlin noise
      particle.position[0] += perlinNoise(time, particle.position[1]) * noiseMovementStrength * delta
      particle.position[1] += perlinNoise(time, particle.position[0]) * noiseMovementStrength * delta
      particle.position[2] += perlinNoise(time, particle.position[1]) * noiseMovementStrength * delta * 0.2

      // // if the particle is near the pointer, move it away
      // const distanceSquared = Math.pow(pointer.x - particle.position[0], 2) + Math.pow(pointer.y - particle.position[1], 2)
      // particle.position[0] -= (pointer.x - particle.position[0]) * (1 / distanceSquared) * delta * 0.05
      // particle.position[1] -= (pointer.y - particle.position[1]) * (1 / distanceSquared) * delta * 0.05

      // reset the particle if it's out of range
      if (particle.position[1] > yMax) {
        particle.position[1] = yMin
      }
      if (particle.position[1] < yMin) {
        particle.position[1] = yMax
      }
      if (particle.position[0] > xMax) {
        particle.position[0] = xMin
      }
      if (particle.position[0] < xMin) {
        particle.position[0] = xMax
      }

      // update the position
      pointsRef.current.geometry.attributes.position.setXYZ(
        index,
        particle.position[0] * threeWidth,
        particle.position[1] * threeHeight,
        particle.position[2],
      )
    })

    // update the geometry
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={pointsRef} limit={maxParticles} range={particles.length}>
      <shaderMaterial
        args={[{ ...DustShader, uniforms: UniformsUtils.clone(DustShader.uniforms) }]}
        uniforms-pointTexture-value={pointTexture}
        uniforms-color-value={color}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent={true}
      />

      {/* <PointMaterial transparent vertexColors size={15} sizeAttenuation={false} depthWrite={false}  /> */}

      {particles.map((particle, index) => {
        const position: Vector3Array = [particle.position[0] * threeWidth, particle.position[1] * threeHeight, particle.position[2]]

        return <Point key={index} position={position} size={particle.scale} />
      })}
    </Points>
  )
}
