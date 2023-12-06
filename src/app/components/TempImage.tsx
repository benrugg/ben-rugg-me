import { useRef, useState, MouseEvent, TouchEvent } from "react"
import { useSpring, animated, config } from "@react-spring/three"

const aspectRatio = 16 / 9
const offScreenY = 5

export function TempImage(props: {
  index: number
  sectionIndex: number
  isTransitioningTo: boolean
  isTransitioningFrom: boolean
  isScreenReady: boolean
  rotationDirection: "left" | "right"
  tempColor: string
}) {
  // init refs and state
  const groupRef = useRef<THREE.Group>(null!)
  const [visible, setVisible] = useState(false)

  // calculate the height of the image
  const height = 1 / aspectRatio

  // calculate the rotation of the image
  const rotationY = props.rotationDirection === "left" ? Math.PI / 5 : -Math.PI / 5

  // prepare spring animation
  const startPositionY = -offScreenY
  const endPositionY = offScreenY
  const readyPositionY = 0
  const startRotationX = Math.PI / 3
  const endRotationX = -Math.PI / 3
  const readyRotationX = 0

  const spring = useSpring({
    positionY:
      props.isTransitioningTo || props.isTransitioningFrom || props.sectionIndex < props.index
        ? startPositionY
        : props.sectionIndex > props.index
        ? endPositionY
        : readyPositionY,
    rotationX:
      props.isTransitioningTo || props.isTransitioningFrom || props.sectionIndex < props.index
        ? startRotationX
        : props.sectionIndex > props.index
        ? endRotationX
        : readyRotationX,
    onStart: () => {
      if (props.sectionIndex === props.index) {
        setVisible(true)
      }
    },
    onRest: () => {
      if (props.sectionIndex !== props.index) {
        setVisible(false)
      }
    },
    config: () => {
      if (props.isTransitioningFrom) {
        return config.molasses
      } else {
        return config.slow
      }
    },
  })

  return (
    <animated.group ref={groupRef} scale={[4.2, 4.2, 1]} position-y={spring.positionY} rotation-x={spring.rotationX} visible={visible}>
      <mesh rotation={[0, rotationY, 0]}>
        <planeGeometry args={[1, height]} />
        <meshStandardMaterial color={props.tempColor} transparent />
      </mesh>
    </animated.group>
  )
}

export function TempImageHtml(props: {
  index: number
  sectionIndex: number
  isTransitioningTo: boolean
  isTransitioningFrom: boolean
  isScreenReady: boolean
  title: string
  body: string
}) {
  // define function to stop propagation of events, so we can scroll internal
  // contents without triggering a swipe to a new section
  const stopPropagation = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  // prepare animation classes
  const cssClass = props.isScreenReady && props.sectionIndex === props.index ? "fade-and-slide-in" : "fade-and-slide-out"

  const parentCssClass = props.isScreenReady && props.sectionIndex === props.index ? "" : "pointer-events-none"

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-screen absolute ${parentCssClass}`}>
      <h1 className={`text-4xl font-bold text-white ${cssClass}`}>{props.title}</h1>
      <div
        className="max-w-md text-white text-center mt-3 max-h-72 overflow-scroll"
        onTouchStart={stopPropagation} // match events from ReactScrollWheelHandler
        onTouchEnd={stopPropagation}
        onMouseDown={stopPropagation}
        onMouseUp={stopPropagation}
        onWheelCapture={stopPropagation}
      >
        <p className={`${cssClass} animation-delay-700`}>
          <span dangerouslySetInnerHTML={{ __html: props.body }} />
        </p>
      </div>
    </div>
  )
}
