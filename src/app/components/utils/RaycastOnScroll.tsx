import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"

export const RaycastOnScroll = () => {
  // trigger an onPointerMove event on scroll
  const data = useScroll()
  let lastOffset = data.offset

  useFrame((state) => {
    if (data.offset !== lastOffset) {
      if (state.events.update) {
        state.events.update()
      }
      lastOffset = data.offset
    }
  })

  return <></>
}
