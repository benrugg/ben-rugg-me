// import { useRef, useState } from "react"
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing"
// import { DepthOfField } from "@react-three/postprocessing"
// import { ToneMapping } from "@react-three/postprocessing"
// import { ToneMappingMode } from "postprocessing"
// import { VignetteEffect } from "postprocessing"
import { useThree } from "@react-three/fiber"
import { useScreenState } from "@/app/hooks/useScreenState"
import { useSpring, animated } from "@react-spring/three"

export default function Effects() {
  // get the current screen state for the Madison screen
  const { isActive: isMadisonScreenVisible } = useScreenState("madison")

  // get screen size
  const { size } = useThree()

  // prepare spring animation
  const AnimatedVignette = animated(Vignette)
  const AnimatedBloom = animated(Bloom)

  const spring = useSpring({
    vignetteDarkness: isMadisonScreenVisible ? 0 : 0.8,
    vignetteOffset: isMadisonScreenVisible ? 0 : size.width <= 950 ? 0.2 : 1,
    bloomIntensity: isMadisonScreenVisible ? 2 : 0,
    config: () => {
      if (isMadisonScreenVisible) {
        return {
          tension: 200,
          friction: 190,
          precision: 0.001,
        }
      } else {
        return {
          tension: 350,
          friction: 120,
          precision: 0.001,
        }
      }
    },
  })

  return (
    <EffectComposer>
      {/* <DepthOfField focusDistance={0.003} focalLength={0.01} bokehScale={5} width={1024} height={1024} /> */}
      <AnimatedBloom mipmapBlur luminanceThreshold={0.7} levels={5} intensity={spring.bloomIntensity} />
      <AnimatedVignette eskil={false} offset={spring.vignetteOffset} darkness={spring.vignetteDarkness} />
      {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
    </EffectComposer>
  )
}
