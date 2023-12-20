import { useEffect, useRef, useState, Suspense } from "react"
import { useSpring, animated, config } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import { MathUtils } from "three"
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

  // change size of the content depending on screen size (mobile responsive)
  // (on smaller screens, scale up the content a bit, because the sidebar text won't be there)
  const { viewport, size } = useThree()
  const screenAspectRatio = viewport.width / viewport.height
  const scaleMultiplier = size.width < 1250 ? 1.3 : 1
  const minContentScale = 1.0
  const maxContentScale = 4.4 * scaleMultiplier
  const minAspectRatio = 0.2
  const maxAspectRatio = 1.7

  const contentScale = MathUtils.clamp(
    MathUtils.mapLinear(screenAspectRatio, minAspectRatio, maxAspectRatio, minContentScale, maxContentScale),
    minContentScale,
    maxContentScale,
  )

  // calculate the rotation of the image (on smaller screens, don't rotate as much)
  const rotationYMultiplier = size.width < 650 ? 0.5 : 1
  const rotationY = (props.rotationDirection === "left" ? Math.PI / 7 : -Math.PI / 7) * rotationYMultiplier

  // declare a function to show the text content on mobile
  const showTextContent = () => {
    if (size.width >= 1250 && size.height >= 650) return
    useScreenStore.getState().setIsTextContentVisibleOnMobile(true)
  }

  // on narrow-screened mobile devices, replace the title slide with a mobile-friendly version
  const processSlideImageUrl = (url: string) => {
    return size.width <= 600 && slideIndex === 0 ? url.replace("-0", "-0-mobile") : url
  }

  // prepare the current slide
  const Slide = (props.content.slides[slideIndex] as VideoSlide).video ? (
    <PlaneVideo url={(props.content.slides[slideIndex] as VideoSlide).video} onClick={showTextContent} />
  ) : (
    <PlaneImage url={processSlideImageUrl((props.content.slides[slideIndex] as ImageSlide).image)} onClick={showTextContent} />
  )

  // when visible and not on the last slide, preload the next image/video
  let NextSlide = null
  if (props.sectionIndex === props.index && slideIndex < props.content.slides.length - 1) {
    const nextSlideIndex = slideIndex + 1
    NextSlide = (props.content.slides[nextSlideIndex] as VideoSlide).video ? (
      <PlaneVideo url={(props.content.slides[nextSlideIndex] as VideoSlide).video} justPreload={true} />
    ) : (
      <PlaneImage url={(props.content.slides[nextSlideIndex] as ImageSlide).image} justPreload={true} />
    )
  }

  return (
    <animated.group
      ref={groupRef}
      scale={[contentScale, contentScale, 1]}
      position-y={spring.positionY}
      rotation-x={spring.rotationX}
      visible={visible}
    >
      <group rotation={[0, rotationY, 0]}>
        <ArrowButton
          position={[-0.56, 0, 0.01]}
          rotation={[0, Math.PI, 0]}
          onClick={() => {
            handleArrowButtonClick("previous")
          }}
        />

        <Suspense fallback={null}>{Slide}</Suspense>
        {NextSlide && <Suspense fallback={null}>{NextSlide}</Suspense>}

        <ArrowButton
          position={[0.56, 0, 0.01]}
          rotation={[0, 0, 0]}
          onClick={() => {
            handleArrowButtonClick("next")
          }}
        />
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
  isOnMobile: boolean
  content: Content
}) {
  // prepare css classes
  const animationClass =
    props.isScreenReady && props.sectionIndex === props.index
      ? props.isOnMobile
        ? "fade-and-slide-in"
        : "fade-and-slide-in-with-delay"
      : "fade-and-slide-out"
  const pointerEventsClass = props.isScreenReady && props.sectionIndex === props.index ? "pointer-events-auto" : ""
  const positionClass = props.isOnMobile ? "" : "absolute"

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
    <div className={`flex flex-row items-stretch justify-start min-h-full max-w-xl ${positionClass} pointer-events-none`}>
      <div
        className={`${animationClass} ${pointerEventsClass} flex flex-col justify-center ${firaCode.className} xs:text-xs text-[13px] tracking-wide font-normal text-white uppercase`}
      >
        <div className="contentTextWrap space-y-7 overflow-scroll" {...stopPointerProps} {...stopWheelProps}>
          {TextContent}
        </div>
      </div>
    </div>
  )
}
