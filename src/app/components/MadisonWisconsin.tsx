import * as THREE from "three"
import { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
import { useRouter } from "next/navigation"
import type { Vector3Array } from "@/types"

export default function MadisonWisconsin(props: { isActive: boolean }) {
  // init refs
  const ref = useRef<THREE.Group>(null!)

  // load the model
  // @ts-ignore
  const { nodes } = useGLTF("/models/wi-state-capitol.glb")

  // rotate the screen on pointer move
  useRotationOnPointerMove(ref, -2)

  // prepare spring animation
  const spring = useSpring({
    rotationX: props.isActive ? 0 : Math.PI / 2,
    scale: props.isActive ? 1 : 0.01,
    position: props.isActive ? ([0, -0.2, 0] as Vector3Array) : ([0, -4, -2] as Vector3Array),
    opacity: props.isActive ? 1 : 0,
    config: () => {
      if (props.isActive) {
        return {
          tension: 250,
          friction: 130,
          precision: 0.001,
        }
      } else {
        return {
          tension: 400,
          friction: 130,
          precision: 0.001,
        }
      }
    },
  })

  // declare function to navigate home
  const router = useRouter()

  const navigateHome = () => {
    router.push("/")
  }

  return (
    <group ref={ref}>
      <animated.group rotation-x={spring.rotationX} scale={spring.scale} position={spring.position}>
        <mesh geometry={nodes["capitol"].geometry} rotation={[0, Math.PI / 4, 0]} position={[0, -1, 0]} onClick={navigateHome}>
          {/* <meshPhysicalMaterial attach="material" color={0xffffff} roughness={0.8} metalness={0} transmission={0.5} /> */}
          {/* <MeshRefractionMaterial envMap={texture} bounces={0} aberrationStrength={0.01} ior={2.75} fresnel={1} color="white" fastChroma={true} /> */}
          {
            // @ts-ignore
            <animated.meshPhysicalMaterial
              color="pink"
              metalness={0.5}
              roughness={0}
              transmission={1}
              thickness={0.1}
              ior={1.8}
              side={THREE.DoubleSide}
              transparent={true}
              iridescence={0.5}
              iridescenceIOR={1.5}
              clearcoat={1}
              opacity={spring.opacity}
            />
          }
        </mesh>
      </animated.group>
    </group>
  )
}
