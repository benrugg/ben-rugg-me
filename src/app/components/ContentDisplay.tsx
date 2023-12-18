import { useEffect, useRef, useState, Suspense } from "react"
import { useSpring, animated, config } from "@react-spring/three"
import PlaneVideo from "@/app/components/PlaneVideo"
import PlaneImage from "@/app/components/PlaneImage"
import ArrowButton from "@/app/components/ArrowButton"
import { useScreenStore } from "@/app/stores/screenStore"
import { useRotationOnPointerMove } from "@/app/hooks/useRotationOnPointerMove"
import { stopPointerProps, stopWheelProps } from "@/utils/stop-pointer-propagation"
import { firaCode } from "@/fonts/fonts"
import type { Content, ImageSlide, VideoSlide } from "@/types"

const offScreenY = 5

export function ContentDisplay(props: {
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

  // rotate the image on pointer move
  useRotationOnPointerMove(groupRef, 1.2)

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
        setSlideIndex(0)
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

  // show the content when the spring is ready (NOTE: this is a hack to fix an
  // issue where ocassionally the content would start at the ready position, and
  // not animate in)
  if (!visible && spring.positionY.get() === readyPositionY) {
    setVisible(true)
  }

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

  // listen for key presses
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!visible) return

    if (event.key === "ArrowLeft") {
      handleArrowButtonClick("previous")
    } else if (event.key === "ArrowRight") {
      handleArrowButtonClick("next")
    }
  }

  useEffect(() => {
    // add event listener
    window.addEventListener("keydown", handleKeyDown)

    // listen for changes to the slide index proxy, which counts as a left/right swipe
    const unsubscribeFromScreenStore = useScreenStore.subscribe((state, prevState) => {
      if (!visible) return

      if (state.slideIndexProxy !== prevState.slideIndexProxy) {
        if (state.slideIndexProxy > prevState.slideIndexProxy) {
          handleArrowButtonClick("next")
        } else {
          handleArrowButtonClick("previous")
        }
      }
    })

    // cleanup when unmounting
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      unsubscribeFromScreenStore()
    }
  })

  // prepare the current slide
  const Slide = (props.content.slides[slideIndex] as VideoSlide).video ? (
    <PlaneVideo url={(props.content.slides[slideIndex] as VideoSlide).video} />
  ) : (
    <PlaneImage url={(props.content.slides[slideIndex] as ImageSlide).image} />
  )

  return (
    <animated.group ref={groupRef} scale={[4.4, 4.4, 1]} position-y={spring.positionY} rotation-x={spring.rotationX} visible={visible}>
      <group rotation={[0, rotationY, 0]}>
        {hasSlides && (
          <ArrowButton
            position={[-0.56, 0, 0]}
            rotation={[0, Math.PI, 0]}
            onClick={() => {
              handleArrowButtonClick("previous")
            }}
          />
        )}
        <Suspense fallback={null}>{Slide}</Suspense>
        {hasSlides && (
          <ArrowButton
            position={[0.56, 0, 0]}
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

export function ContentDisplayHtml(props: {
  index: number
  sectionIndex: number
  isTransitioningTo: boolean
  isTransitioningFrom: boolean
  isScreenReady: boolean
  content: Content
}) {
  // prepare animation classes
  const cssClass = props.isScreenReady && props.sectionIndex === props.index ? "fade-and-slide-in" : "fade-and-slide-out"
  const pointerEventsClass = props.isScreenReady && props.sectionIndex === props.index ? "pointer-events-auto" : ""

  // prepare the text content
  const TextContent = props.content.text.map((content, index) => {
    return (
      <div key={index}>
        <h4 className="text-aqua mb-0.5">{content.title}</h4>
        {content.url ? (
          <div className="contentTextBody">
            <a href={content.url} target="_blank" rel="noreferrer">
              {content.body}
            </a>
          </div>
        ) : (
          <div className="contentTextBody" dangerouslySetInnerHTML={{ __html: content.body }} />
        )}
      </div>
    )
  })

  return (
    <div className="flex flex-row items-stretch justify-start min-h-full absolute pointer-events-none">
      <div
        className={`${cssClass} ${pointerEventsClass} flex flex-col justify-center ${firaCode.className} text-xs tracking-wide font-normal text-white uppercase`}
      >
        <div className="contentTextWrap space-y-7 overflow-scroll" {...stopPointerProps} {...stopWheelProps}>
          {TextContent}
        </div>
      </div>
    </div>
  )
}
