import * as THREE from "three"
import { MathUtils } from "three"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, useTexture } from "@react-three/drei"

const imageRotationAmount = 0.1
const imageRotationDamping = 2.75

export default function TempImage(props: { url: string }) {
  const texture = useTexture(props.url)
  const ref = useRef<THREE.Mesh>(null!)

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
      <mesh ref={ref}>
        <planeGeometry args={[1.4 * 2, 0.9 * 2, 10, 10]} />
        <MeshDistortMaterial distort={0.22} speed={1.5} map={texture} roughness={0.3} />
      </mesh>
      <pointLight position={[0, 0, 1.5]} intensity={0.5} />
    </>
  )
}
