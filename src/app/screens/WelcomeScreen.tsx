import * as THREE from "three"
import { useRef } from "react"
import { useThree } from "@react-three/fiber"
// import { usePagePosition } from "@/app/hooks/usePagePosition"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
// import Particles from "@/app/components/Particles"
import FloatingVideo from "@/app/components/FloatingVideo"
import Ground from "@/app/components/Ground"

export function WelcomeScreen(props: { page: number }) {
  // const { yPosition } = usePagePosition(props.page)
  const yPosition = 0

  // init refs
  const groupRef = useRef<THREE.Group>(null!)

  // rotate the screen on pointer move
  const rotationConfig = {
    rotationXAmount: -0.03,
    rotationYAmount: 0.06,
    rotationDamping: 4,
  }
  useRotationOnPointerMove(groupRef, rotationConfig)

  // set the video's size dynamically
  const { size } = useThree()
  const desiredPixelWidth = Math.min(size.width * 0.4, 1200)

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
      {/* <Particles /> */}
      <Ground />
      <group position={[-2.5, 0, -1]}>
        <FloatingVideo url="/video/clover-demo.mp4" desiredPixelWidth={desiredPixelWidth} title={"products &\ncompanies"} titlePosition="right" />
      </group>
      <group position={[2.5, 0, -1]}>
        <FloatingVideo url="/video/ai-render-demo.mp4" desiredPixelWidth={desiredPixelWidth} title={"websites &\nsoftware"} />
      </group>
    </group>
  )
}

export function WelcomeScreenHtml(props: { page: number }) {
  // const { styleTop } = usePagePosition(props.page)
  const styleTop = 0

  return (
    <div className="flex flex-col items-center justify-top min-h-screen w-screen absolute" style={{ top: styleTop }}>
      <h1 className="text-6xl font-bold text-slate-200 pt-16">Ben Rugg</h1>
      <p className="mt-3 font-light text-lg text-slate-200">web / software / digital</p>
    </div>
  )
}
