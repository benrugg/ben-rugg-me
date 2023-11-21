import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import { useCursor } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { UniformsUtils } from "three"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
import { HoverImageShader } from "@/shaders/HoverImageShader"
import { getScaleForDesiredPixelWidth } from "@/utils/three-camera-math"

const imageRotationXAmount = -0.05
const imageRotationYAmount = 0.1
const aspectRatio = 16 / 9

export default function FloatingScreen(props: { texture: THREE.Texture; desiredPixelWidth: number }) {
  // init ref, state, and utility objects
  const ref = useRef<THREE.Mesh>(null!)
  const [scale, setScale] = useState(1)
  const [hovered, setHovered] = useState(false)
  const vector3 = useMemo(() => new THREE.Vector3(), [])

  // calculate the width of images/videos based on the screen size and world position
  const { camera, size: screenSize } = useThree()
  useEffect(() => {
    const worldPosition = ref.current.getWorldPosition(vector3)
    setScale(getScaleForDesiredPixelWidth(props.desiredPixelWidth, worldPosition.z, camera, screenSize))
  }, [vector3, camera, screenSize, props.desiredPixelWidth])

  // set cursor to pointer when hovering
  useCursor(hovered)

  // prepare spring animation
  const spring = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: { tension: 180, friction: 130 },
  })

  // rotate the screen on pointer move
  useRotationOnPointerMove(ref, 5)

  return (
    <>
      <mesh ref={ref} scale={[scale, scale, 1]} onPointerOver={(event) => setHovered(true)} onPointerOut={(event) => setHovered(false)}>
        <planeGeometry args={[1, 1 / aspectRatio]} />
        <animated.shaderMaterial
          args={[{ ...HoverImageShader, uniforms: UniformsUtils.clone(HoverImageShader.uniforms) }]}
          uniforms-textureImage-value={props.texture}
          uniforms-hover-value={spring.hoverValue}
          uniforms-opacity-value={1.0}
        />
      </mesh>
    </>
  )
}
