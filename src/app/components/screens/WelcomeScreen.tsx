import * as THREE from "three"
import { useRef } from "react"
import Link from "next/link"
import { useThree } from "@react-three/fiber"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
import FloatingVideo from "@/app/components/FloatingVideo"
import Ground from "@/app/components/Ground"
import { useScreenState } from "@/app/hooks/useScreenState"
import { useSpring, animated } from "@react-spring/three"
import { firaCode } from "@/app/fonts/fonts"

function WelcomeScreenContents() {
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
  let videoLightSize: "large" | "small" = "large"
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
    videoLightSize = "small"
    groundYPosition = -0.95
    groundWidth = 15
    groundHeight = 8
  }

  if (screenAspectRatio <= 0.6) {
    // narrow/tall mobile
    groupYPosition = -0.92
    videoScale = 2.2
    video1YPosition = 1.47
  }

  return (
    <group ref={groupRef} position={[0, groupYPosition, 0]}>
      {/* <Particles /> */}
      <Ground position={[0, groundYPosition, 0]} width={groundWidth} height={groundHeight} />
      <group position={[-videoXPosition, video1YPosition, videoZPosition]} scale={[videoScale, videoScale, 1]}>
        <FloatingVideo
          url="/video/companies-and-products.mp4"
          name="companies"
          title={"products &\ncompanies"}
          titlePosition="right"
          lightSize={videoLightSize}
        />
      </group>
      <group position={[videoXPosition, video2YPosition, videoZPosition]} scale={[videoScale, videoScale, 1]}>
        <FloatingVideo url="/video/websites-and-software.mp4" name="projects" title={"websites &\nsoftware"} lightSize={videoLightSize} />
      </group>
    </group>
  )
}

export function WelcomeScreen() {
  // get the current screen state
  const { currentScreen, isVisible } = useScreenState("welcome")

  // prepare spring animation
  const spring = useSpring({
    positionY: currentScreen === "welcome" ? 0 : -4,
    positionZ: currentScreen === "welcome" ? 0 : 4,
    config: {
      tension: 320,
      friction: 420,
      mass: 50,
      precision: 0.001,
    },
  })

  return (
    <animated.group position-y={spring.positionY} position-z={spring.positionZ} visible={isVisible}>
      {isVisible && <WelcomeScreenContents />}
    </animated.group>
  )
}

export function WelcomeScreenHtml() {
  return (
    <div className="flex flex-col items-stretch justify-between h-[100dvh] w-screen absolute">
      <div>
        <h1
          className={`${firaCode.className} text-[30px] tracking-widest font-light mt-16 smheight:mt-14 xsheight:mt-12 text-white text-center uppercase`}
        >
          Ben Rugg
        </h1>
        <p
          className={`${firaCode.className} text-[19px] tracking-wider font-light mt-1 smheight:mt-0 text-aqua mx-auto w-fit text-center cursor-pointer`}
        >
          <Link href="/full-stack-engineer" prefetch={false}>
            {"< / >"}
          </Link>
        </p>
      </div>
      <div
        className={`flex flex-row flex-wrap gap-x-3 xs:gap-x-8 xs:gap-y-1 gap-y-0 items-center justify-between xs:mb-4 mb-3 sm:px-6 px-4 ${firaCode.className} xs:text-xs text-[13px] tracking-wide font-normal text-white uppercase`}
      >
        <p className="cursor-pointer hover:text-aqua">
          <Link href="/full-stack-engineer" prefetch={false}>
            Full-Stack/Engineer
          </Link>
        </p>
        <p className="basis-1/3 sm:basis-0 text-right sm:text-center cursor-pointer hover:text-aqua">
          <Link href="/about" prefetch={false}>
            About
          </Link>
        </p>
        <p className="basis-1/3 sm:basis-0 text-left sm:text-center cursor-pointer hover:text-aqua">
          <Link href="/contact" prefetch={false}>
            Contact
          </Link>
        </p>
        <p className="cursor-pointer hover:text-aqua">
          <Link href="/madison" prefetch={false}>
            Madison/Wisconsin
          </Link>
        </p>
      </div>
    </div>
  )
}
