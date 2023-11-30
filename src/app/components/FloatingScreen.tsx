import * as THREE from "three"
import { MathUtils } from "three"
import { useEffect, /* useMemo, */ useRef, useState } from "react"
// import { useThree } from "@react-three/fiber"
import { Center, MeshDistortMaterial, Text3D, useCursor } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
// import { UniformsUtils } from "three"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
// import { getScaleForDesiredPixelWidth } from "@/utils/three-camera-math"

const aspectRatio = 16 / 9
const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function FloatingScreen(props: {
  texture: THREE.Texture
  desiredPixelWidth: number
  title: string
  titlePosition?: "left" | "right"
}) {
  // init ref, state, and utility objects
  const ref = useRef<THREE.Group>(null!)
  const spotlightRef = useRef<THREE.SpotLight>(null!)
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
    lightIntensity: hovered ? 5 : 0,
    videoMaterialDistortMagnitude: hovered ? 0.35 : 0.2,
    videoMaterialReflectivity: hovered ? 1 : 0.5,
    videoMaterialMetalness: hovered ? 0.5 : 0,
    videoMaterialIrridescence: hovered ? 1 : 0,
    textMaterialColor: hovered ? "#a0c0c0" : "#b2e8f9",
    textMaterialIridescence: hovered ? 0.5 : 1,
    textMaterialIridescenceIOR: hovered ? 1.9 : 1.9,
    textMaterialReflectivity: hovered ? 1 : 1,
    textMaterialMetalness: hovered ? 0 : 0.8,
    textMaterialRoughness: hovered ? 0.5 : 1,
    config: (key) => {
      if (key === "hoverValue") {
        return { tension: 180, friction: 130 }
      } else {
        return config.gentle
      }
    },
  })

  // set the spotlight to look at the image/video
  useEffect(() => {
    spotlightRef.current.target = ref.current
  })

  // rotate the screen on pointer move
  useRotationOnPointerMove(ref, 2)

  return (
    <group ref={ref} scale={[4.2, 4.2, 1]} onPointerOver={(event) => setHovered(true)} onPointerOut={(event) => setHovered(false)}>
      <mesh>
        <planeGeometry args={[1, height, 5, 5]} />
        {/* @ts-ignore */}
        <AnimatedMeshDistortMaterial
          distort={spring.videoMaterialDistortMagnitude}
          speed={1}
          map={props.texture}
          roughness={0.2}
          reflectivity={spring.videoMaterialReflectivity}
          metalness={spring.videoMaterialMetalness}
          iridescence={spring.videoMaterialIrridescence}
        />
      </mesh>
      <Center
        position={[textXPosition, -0.5 * height - 0.03, 0.25]}
        top
        left={props.titlePosition === "right"}
        right={props.titlePosition !== "right"}
      >
        <Text3D font="/fonts/Inter-SemiBold.json" scale={[0.06, 0.06, 0.4]} letterSpacing={-0.06} lineHeight={0.51}>
          {props.title}
          <animated.meshPhysicalMaterial
            color={spring.textMaterialColor}
            iridescence={spring.textMaterialIridescence}
            iridescenceIOR={spring.textMaterialIridescenceIOR}
            reflectivity={spring.textMaterialReflectivity}
            metalness={spring.textMaterialMetalness}
            roughness={spring.textMaterialRoughness}
          />
        </Text3D>
      </Center>
      <animated.spotLight
        ref={spotlightRef}
        position={[0, 1.6, 10]}
        intensity={spring.lightIntensity}
        decay={0}
        angle={MathUtils.degToRad(10)}
        penumbra={0.3}
      />
    </group>
  )
}
