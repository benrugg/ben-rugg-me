import * as THREE from "three"
import { MathUtils } from "three"
import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, useTexture } from "@react-three/drei"
import { Vector3Array } from "@/types"

const imageRotationAmount = 0.1
const imageRotationDamping = 2.75

export default function TempImage(props: { position: Vector3Array; url: string }) {
  const lightPosition: Vector3Array = [...props.position]
  lightPosition[2] += 1.5

  const texture = useTexture(props.url)

  const ref = useRef<THREE.Mesh>(null!)
  const { width, height } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, state.pointer.x * Math.PI * imageRotationAmount, imageRotationDamping, delta)
    ref.current.rotation.x = MathUtils.damp(
      ref.current.rotation.x,
      -state.pointer.y * Math.PI * imageRotationAmount * 0.5,
      imageRotationDamping,
      delta,
    )
  })

  return (
    <>
      <mesh {...props} ref={ref}>
        <planeGeometry args={[1.4 * 2, 0.9 * 2, 10, 10]} />
        <MeshDistortMaterial distort={0.22} speed={1.5} map={texture} roughness={0.3} />
      </mesh>
      <pointLight position={lightPosition} intensity={0.5} />
    </>
  )
}
