import { useRef, useState } from "react"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { BloomEffect, VignetteEffect } from "postprocessing"
import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"

// NOTE:
// It may not be advisable to add/remove the effect passes on the fly. Or to
// add/remove the effect composer on the fly. This functionality could be removed
// and we could just set the intensity of the effects to 0 when we don't want them.

export default function Effects() {
  // init refs
  const bloomRef = useRef<BloomEffect>(null!)
  const vignetteRef = useRef<VignetteEffect>(null!)

  // init state
  const [includeBloom, setIncludeBloom] = useState(true)
  const [includeVignette, setIncludeVignette] = useState(true)

  // use scroll and update effects each frame
  const data = useScroll()

  useFrame(() => {
    // page 0
    const bloomIntensity = 50 * data.curve(0, 0.1, 0.1)
    if (bloomRef.current) {
      bloomRef.current.intensity = bloomIntensity
    }
    setIncludeBloom(bloomIntensity > 0.0001)

    // page 2
    const vignetteOffset = 0.1 * data.curve(0.2, 0.1, 0.1)
    const vignetteDarkness = 1.1 * data.curve(0.2, 0.1, 0.1)
    if (vignetteRef.current) {
      vignetteRef.current.offset = vignetteOffset
      vignetteRef.current.darkness = vignetteDarkness
    }
    setIncludeVignette(vignetteDarkness > 0.0001)
  })

  return (
    <>
      {(includeBloom || includeVignette) && (
        <EffectComposer>
          <>{includeBloom && <Bloom ref={bloomRef} mipmapBlur luminanceThreshold={0.9} levels={8} intensity={0} />}</>
          <>{includeVignette && <Vignette ref={vignetteRef} eskil={false} offset={0} darkness={0} />}</>
        </EffectComposer>
      )}
    </>
  )
}
