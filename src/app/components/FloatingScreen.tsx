import * as THREE from "three"
import { /*useEffect, useMemo,*/ useRef, useState } from "react"
// import { useThree } from "@react-three/fiber"
import { Center, Text3D, useCursor } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { UniformsUtils } from "three"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
import { HoverImageShader } from "@/shaders/HoverImageShader"
// import { getScaleForDesiredPixelWidth } from "@/utils/three-camera-math"

const aspectRatio = 16 / 9

export default function FloatingScreen(props: {
  texture: THREE.Texture
  desiredPixelWidth: number
  title: string
  titlePosition?: "left" | "right"
}) {
  // init ref, state, and utility objects
  const ref = useRef<THREE.Group>(null!)
  // const [scale, setScale] = useState(1)
  const [hovered, setHovered] = useState(false)
  // const vector3 = useMemo(() => new THREE.Vector3(), [])

  // // calculate the width of images/videos based on the screen size and world position
  // const { camera, size: screenSize } = useThree()
  // useEffect(() => {
  //   const worldPosition = ref.current.getWorldPosition(vector3)
  //   setScale(getScaleForDesiredPixelWidth(props.desiredPixelWidth, worldPosition.z, camera, screenSize))
  // }, [vector3, camera, screenSize, props.desiredPixelWidth])

  // calculate the height of the images/video
  const height = 1 / aspectRatio

  // set the position of the text
  const textXPadding = 0.035
  const textXPosition = props.titlePosition === "right" ? 0.5 - textXPadding : -0.5 + textXPadding

  // set cursor to pointer when hovering
  useCursor(hovered)

  // prepare spring animation
  const spring = useSpring({
    hoverValue: hovered ? 1 : 0,
    config: { tension: 180, friction: 130 },
  })

  // rotate the screen on pointer move
  useRotationOnPointerMove(ref, 2)

  return (
    <group ref={ref} scale={[4.2, 4.2, 1]}>
      <mesh onPointerOver={(event) => setHovered(true)} onPointerOut={(event) => setHovered(false)}>
        <planeGeometry args={[1, height]} />
        <animated.shaderMaterial
          args={[{ ...HoverImageShader, uniforms: UniformsUtils.clone(HoverImageShader.uniforms) }]}
          uniforms-textureImage-value={props.texture}
          uniforms-hover-value={spring.hoverValue}
          uniforms-opacity-value={1.0}
        />
      </mesh>
      <Center
        position={[textXPosition, -0.5 * height - 0.03, 0.2]}
        top
        left={props.titlePosition === "right"}
        right={props.titlePosition !== "right"}
      >
        <Text3D font="/fonts/Inter-SemiBold.json" scale={[0.06, 0.06, 0.12]} letterSpacing={-0.06} lineHeight={0.51}>
          {props.title}
          <meshBasicMaterial color="#e2e8f0" />
        </Text3D>
      </Center>
    </group>
  )
}
