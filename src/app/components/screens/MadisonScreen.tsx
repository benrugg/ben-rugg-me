import * as THREE from "three"
import { Suspense, useMemo } from "react"
import Image from "next/image"
import { useThree } from "@react-three/fiber"
import { useScreenState } from "@/app/hooks/useScreenState"
import { useSpring } from "@react-spring/three"
import MadisonWisconsin from "@/app/components/MadisonWisconsin"

export function MadisonScreen() {
  // get the current screen state
  const { isActive, isTransitioningTo, isScreenReady } = useScreenState("madison")

  // get the three scene
  const { scene } = useThree()

  // init color utility object
  const color = useMemo(() => new THREE.Color(), [])

  // prepare spring animation
  useSpring({
    color: isTransitioningTo || isScreenReady ? "#1eecff" : "#060012",
    config: {
      tension: 300,
      friction: 130,
      precision: 0.001,
    },
    onChange(result) {
      scene.background = color.set(result.value.color)
    },
    from: {
      color: "#060012",
    },
  })

  return (
    <Suspense fallback={null}>
      <group>{isActive && <MadisonWisconsin isActive={isScreenReady} />}</group>
    </Suspense>
  )
}

export function MadisonScreenHtml() {
  // get the current screen state
  const { isVisible, isScreenReady, isTransitioningFrom } = useScreenState("madison")

  // prepare animation classes
  const cssClass = isScreenReady || isTransitioningFrom ? "fade-in-slow-with-delay" : "fade-out-slow"

  return (
    <>
      {isVisible && (
        <div className="flex justify-center items-center absolute w-screen h-[100dvh] pointer-events-none">
          <div className="relative" style={{ width: "min(100vw, 80dvh)", height: "min(100vw, 80dvh)" }}>
            <Image
              className={`w-full h-full ${cssClass}`}
              style={{ mixBlendMode: "color-burn", transform: "translateZ(0.1px)" }}
              src="/images/textures/madison-wi-overlay.png"
              width={1950}
              height={1950}
              alt="Wisconsin State Outline"
            />
            <a className="pointer-events-auto" href="https://www.google.com/search?q=madison+wi" target="_blank">
              <Image
                className={`h-auto absolute top-[87%] left-[58%] -translate-x-1/2 -translate-y-1/2 ${cssClass}`}
                style={{ mixBlendMode: "color-burn", transform: "translateZ(0.1px)", width: "min(7vw, 5.5dvh)" }}
                src="/images/textures/madison-heart.png"
                width={111}
                height={104}
                alt="Wisconsin State Outline with Heart on Madison"
              />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
