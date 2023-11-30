import * as THREE from "three"
import { useRef } from "react"
import { useThree } from "@react-three/fiber"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
// import Particles from "@/app/components/Particles"
import FloatingVideo from "@/app/components/FloatingVideo"
import Ground from "@/app/components/Ground"
import { group } from "console"

export function WelcomeScreen(props: { page: number }) {
  // init refs
  const groupRef = useRef<THREE.Group>(null!)

  // rotate the screen on pointer move
  useRotationOnPointerMove(groupRef, {
    rotationXAmount: -0.03,
    rotationYAmount: 0.06,
    rotationDamping: 4,
  })

  // change size/position of the videos and the position of the whole scene
  // depending on screen size (mobile responsive)
  const viewport = useThree((state) => state.viewport)
  const screenAspectRatio = viewport.width / viewport.height

  let groupYPosition = 0
  let videoScale = 4.2
  let videoXPosition = 0
  let video1YPosition = 0
  let video2YPosition = 0
  let videoZPosition = -1
  let groundYPosition = -1.4
  let groundWidth = 25
  let groundHeight = 15

  if (screenAspectRatio >= 1.4) {
    // normal/wide screen
    videoXPosition = 2.5
  } else if (screenAspectRatio > 1.04) {
    // a little narrower
    videoXPosition = 2.3
  } else {
    // mobile/tablet
    groupYPosition = -1.05
    videoScale = 2.5
    video1YPosition = 1.65
    video2YPosition = 0
    videoZPosition = -0.2
    groundYPosition = -0.95
    groundWidth = 15
    groundHeight = 8
  }

  if (screenAspectRatio <= 0.6) {
    // narrow/tall mobile
    groupYPosition = -0.9
    videoScale = 2
    video1YPosition = 1.4
  }

  return (
    <group ref={groupRef} position={[0, groupYPosition, 0]}>
      {/* <Particles /> */}
      <Ground position={[0, groundYPosition, 0]} width={groundWidth} height={groundHeight} />
      <group position={[-videoXPosition, video1YPosition, videoZPosition]} scale={[videoScale, videoScale, 1]}>
        <FloatingVideo url="/video/clover-demo.mp4" title={"products &\ncompanies"} titlePosition="right" />
      </group>
      <group position={[videoXPosition, video2YPosition, videoZPosition]} scale={[videoScale, videoScale, 1]}>
        <FloatingVideo url="/video/ai-render-demo.mp4" title={"websites &\nsoftware"} />
      </group>
    </group>
  )
}

export function WelcomeScreenHtml(props: { page: number }) {
  return (
    <div className="flex flex-col items-center justify-top min-h-screen w-screen absolute">
      <h1 className="text-6xl font-bold text-slate-200 pt-16">Ben Rugg</h1>
      <p className="mt-3 font-light text-lg text-slate-200">web / software / digital</p>
    </div>
  )
}
