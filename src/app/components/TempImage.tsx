import { useRef, useState, MouseEvent, TouchEvent } from "react"
import { useSpring, animated, config } from "@react-spring/three"
import PlaneVideo from "@/app/components/PlaneVideo"
import PlaneImage from "@/app/components/PlaneImage"
import PlaneColor from "@/app/components/PlaneColor"
import ArrowButton from "@/app/components/ArrowButton"
import type { Content } from "@/types"

const offScreenY = 5

export function TempImage(props: {
  index: number
  sectionIndex: number
  isTransitioningTo: boolean
  isTransitioningFrom: boolean
  isScreenReady: boolean
  rotationDirection: "left" | "right"
  content: Content
}) {
  // init refs and state
  const groupRef = useRef<THREE.Group>(null!)
  const [visible, setVisible] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const hasSlides = !!props.content.slides?.length

  // calculate the rotation of the image
  const rotationY = props.rotationDirection === "left" ? Math.PI / 7 : -Math.PI / 7

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

  // handle arrow button clicks
  const handleArrowButtonClick = (direction: "next" | "previous") => {
    if (!props.content.slides) return

    if (direction === "next") {
      if (slideIndex === props.content.slides.length - 1) {
        setSlideIndex(0)
      } else {
        setSlideIndex(slideIndex + 1)
      }
    } else {
      if (slideIndex === 0) {
        setSlideIndex(props.content.slides.length - 1)
      } else {
        setSlideIndex(slideIndex - 1)
      }
    }
  }

  // prepare the current slide
  const Slide = props.content.slides?.[slideIndex].video ? (
    <PlaneVideo url={props.content.slides[slideIndex].video} />
  ) : props.content.slides?.[slideIndex].image ? (
    <PlaneImage url={props.content.slides[slideIndex].image} />
  ) : (
    <PlaneColor />
  )

  return (
    <animated.group ref={groupRef} scale={[4.2, 4.2, 1]} position-y={spring.positionY} rotation-x={spring.rotationX} visible={visible}>
      <group rotation={[0, rotationY, 0]}>
        {hasSlides && (
          <ArrowButton
            position={[-0.57, 0, 0]}
            rotation={[0, Math.PI, 0]}
            onClick={() => {
              handleArrowButtonClick("previous")
            }}
          />
        )}
        {Slide}
        {hasSlides && (
          <ArrowButton
            position={[0.57, 0, 0]}
            rotation={[0, 0, 0]}
            onClick={() => {
              handleArrowButtonClick("next")
            }}
          />
        )}
      </group>
    </animated.group>
  )
}

export function TempImageHtml(props: {
  index: number
  sectionIndex: number
  isTransitioningTo: boolean
  isTransitioningFrom: boolean
  isScreenReady: boolean
  content: Content
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
      <h1 className={`text-4xl font-bold text-white ${cssClass}`}>{props.content.title}</h1>
      <div
        className="max-w-md text-white text-center mt-3 max-h-72 overflow-scroll"
        onTouchStart={stopPropagation} // match events from ReactScrollWheelHandler
        onTouchEnd={stopPropagation}
        onMouseDown={stopPropagation}
        onMouseUp={stopPropagation}
        onWheelCapture={stopPropagation}
      >
        <p className={`${cssClass} animation-delay-700`}>
          <span dangerouslySetInnerHTML={{ __html: props.content.body }} />
        </p>
      </div>
    </div>
  )
}
