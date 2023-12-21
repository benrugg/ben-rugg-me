import * as THREE from "three"
import { Suspense, useMemo } from "react"
import { useThree } from "@react-three/fiber"
import { useScreenState } from "@/app/hooks/useScreenState"
import { useSpring } from "@react-spring/three"
import MadisonWisconsin from "@/app/components/MadisonWisconsin"

export default function MadisonScreen() {
  // get the current screen state
  const { isVisible, isTransitioningTo, isScreenReady } = useScreenState("madison")

  // get the three scene
  const { scene } = useThree()

  // init color utility object
  const color = useMemo(() => new THREE.Color(), [])

  // prepare spring animation
  useSpring({
    color: isTransitioningTo || isScreenReady ? "#99D7FF" : "#060012",
    config: {
      tension: 300,
      friction: 130,
      precision: 0.001,
    },
    onChange(result) {
      scene.background = color.set(result.value.color)
    },
  })

  return (
    <Suspense fallback={null}>
      <group>{isVisible && <MadisonWisconsin isActive={isScreenReady} />}</group>
    </Suspense>
  )
}
