// import { useRef, useState } from "react"
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing"
// import { DepthOfField } from "@react-three/postprocessing"
// import { ToneMapping } from "@react-three/postprocessing"
// import { ToneMappingMode } from "postprocessing"
// import { VignetteEffect } from "postprocessing"
// import { useFrame } from "@react-three/fiber"
// import { useScroll } from "@react-three/drei"

export default function Effects() {
  // // init refs
  // const vignetteRef = useRef<VignetteEffect>(null!)

  // // use scroll and update effects each frame
  // const data = useScroll()

  // useFrame(() => {
  //   const vignetteOffset = 0.1 * data.curve(0.2, 0.1, 0.1)
  //   const vignetteDarkness = 1.1 * data.curve(0.2, 0.1, 0.1)
  //   if (vignetteRef.current) {
  //     vignetteRef.current.offset = vignetteOffset
  //     vignetteRef.current.darkness = vignetteDarkness
  //   }
  // })

  return (
    <EffectComposer>
      {/* <DepthOfField focusDistance={0.003} focalLength={0.01} bokehScale={5} width={1024} height={1024} /> */}
      {/* <Bloom mipmapBlur luminanceThreshold={0.95} levels={4} intensity={2} /> */}
      <Vignette eskil={false} offset={0.2} darkness={0.8} />
      {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
    </EffectComposer>
  )
}
