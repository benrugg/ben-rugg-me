import * as THREE from "three"
import { MathUtils } from "three"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { UniformsUtils } from "three"
import { HoverImageShader } from "@/shaders/HoverImageShader"

const imageRotationAmount = 0.1
const imageRotationDamping = 2.75

export default function TempImage(props: { url: string }) {
  const texture = useTexture(props.url)
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  const spring = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: { tension: 180, friction: 130 },
  })

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
      <mesh ref={ref} onPointerOver={(event) => setHovered(true)} onPointerOut={(event) => setHovered(false)}>
        <planeGeometry args={[1.4 * 2, 0.9 * 2]} />
        <animated.shaderMaterial
          args={[{ ...HoverImageShader, uniforms: UniformsUtils.clone(HoverImageShader.uniforms) }]}
          uniforms-textureImage-value={texture}
          uniforms-hover-value={spring.hoverValue}
          uniforms-opacity-value={1.0}
        />
      </mesh>
      <pointLight position={[0, 0, 1.5]} intensity={0.5} />
    </>
  )
}
