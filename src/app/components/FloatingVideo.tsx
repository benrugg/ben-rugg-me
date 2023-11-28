import { useVideoTexture } from "@react-three/drei"
import FloatingScreen from "./FloatingScreen"

export default function FloatingVideo(props: { url: string; desiredPixelWidth: number; title: string; titlePosition?: "left" | "right" }) {
  // load the video
  const texture = useVideoTexture(props.url)

  // render the video on a floating screen
  return <FloatingScreen texture={texture} desiredPixelWidth={props.desiredPixelWidth} title={props.title} titlePosition={props.titlePosition} />
}