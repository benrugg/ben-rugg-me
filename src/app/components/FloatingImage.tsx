import { useTexture } from "@react-three/drei"
import FloatingScreen from "./FloatingScreen"

export default function FloatingImage(props: { url: string; desiredPixelWidth: number }) {
  // load the image
  const texture = useTexture(props.url)

  // render the image on a floating screen
  return <FloatingScreen texture={texture} desiredPixelWidth={props.desiredPixelWidth} />
}
