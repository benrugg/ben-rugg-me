import * as THREE from "three"
import { MathUtils } from "three"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useScreenStore } from "@/app/stores/screenStore"
import { Center, MeshDistortMaterial, Text3D, useCursor, useVideoTexture } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"

const aspectRatio = 16 / 9
const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function FloatingVideo(props: {
  url: string
  title: string
  name: string
  titlePosition?: "left" | "right"
  lightSize?: "small" | "large"
}) {
  // init refs and state
  const ref = useRef<THREE.Group>(null!)
  const spotlightRef = useRef<THREE.SpotLight>(null!)
  const [isHovered, setIsHovered] = useState(false)

  // get the router
  const router = useRouter()

  // get the current screen, and determine if we're exiting
  const currentScreen = useScreenStore((state) => state.currentScreen)
  const isExiting = currentScreen === props.name

  // load the video
  const videoTexture = useVideoTexture(props.url)

  // calculate the height of the video
  const height = 1 / aspectRatio

  // set the position of the text
  const textXPadding = 0.035
  const textXPosition = props.titlePosition === "right" ? 0.5 - textXPadding : -0.5 + textXPadding

  // set cursor to pointer when hovering
  useCursor(isHovered)

  // prepare spring animation
  const spring = useSpring({
    hoverValue: isHovered ? 1 : 0,
    lightIntensity: isHovered ? 5 : 0,
    videoMaterialDistortMagnitude: isHovered ? 0.35 : 0.2,
    videoMaterialColor: isExiting ? "#000000" : "#ffffff",
    videoMaterialOpacity: isExiting ? 0 : 1,
    videoMaterialReflectivity: isHovered ? 1 : 0.5,
    videoMaterialMetalness: isHovered ? 0.5 : 0,
    videoMaterialIrridescence: isHovered ? 1 : 0,
    textMaterialColor: isHovered ? "#a0c0c0" : "#b2e8f9",
    textMaterialIridescence: isHovered ? 0.5 : 1,
    textMaterialIridescenceIOR: isHovered ? 1.9 : 1.9,
    textMaterialReflectivity: isHovered ? 1 : 1,
    textMaterialMetalness: isHovered ? 0 : 0.8,
    textMaterialRoughness: isHovered ? 0.5 : 1,
    textMaterialOpacity: isExiting ? 0 : 1,
    config: (key) => {
      if (key === "hoverValue") {
        return { tension: 180, friction: 130 }
      } else if (key === "videoMaterialColor" || key === "videoMaterialOpacity") {
        return { tension: 200, friction: 150 }
      } else if (key === "textMaterialOpacity") {
        return config.slow
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
    <group
      ref={ref}
      onPointerOver={(event) => setIsHovered(true)}
      onPointerOut={(event) => setIsHovered(false)}
      onClick={() => router.push(`/${props.name}`)}
    >
      <mesh name={props.name}>
        <planeGeometry args={[1, height, 5, 5]} />
        {/* @ts-ignore */}
        <AnimatedMeshDistortMaterial
          distort={spring.videoMaterialDistortMagnitude}
          speed={1}
          map={videoTexture}
          color={spring.videoMaterialColor}
          opacity={spring.videoMaterialOpacity}
          roughness={0.2}
          reflectivity={spring.videoMaterialReflectivity}
          metalness={spring.videoMaterialMetalness}
          iridescence={spring.videoMaterialIrridescence}
          alphaTest={0.005}
          transparent
        />
      </mesh>
      <Center
        position={[textXPosition, -0.5 * height + 0.12, 0.25]}
        bottom
        left={props.titlePosition === "right"}
        right={props.titlePosition !== "right"}
      >
        <Text3D font="/fonts/poppins-semibold.json" scale={[0.065, 0.065, 0.4]} letterSpacing={-0.08} lineHeight={0.47}>
          {props.title}
          <animated.meshPhysicalMaterial
            color={spring.textMaterialColor}
            iridescence={spring.textMaterialIridescence}
            iridescenceIOR={spring.textMaterialIridescenceIOR}
            reflectivity={spring.textMaterialReflectivity}
            metalness={spring.textMaterialMetalness}
            roughness={spring.textMaterialRoughness}
            opacity={spring.textMaterialOpacity}
            alphaTest={0.005}
            transparent
          />
        </Text3D>
      </Center>
      <animated.spotLight
        ref={spotlightRef}
        position={[0, props.lightSize === "small" ? 2 : 1.6, 10]}
        intensity={spring.lightIntensity}
        decay={0}
        angle={MathUtils.degToRad(props.lightSize === "small" ? 6 : 10)}
        penumbra={0.3}
      />
    </group>
  )
}
