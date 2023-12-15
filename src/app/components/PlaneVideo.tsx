import { useEffect } from "react"
import { useVideoTexture } from "@react-three/drei"

const aspectRatio = 16 / 9

export default function PlaneVideo(props: { url: string }) {
  // calculate the height of the video
  const height = 1 / aspectRatio

  // load the video
  const videoTexture = useVideoTexture(props.url)

  // pause the video and start it at the beginning on unmount or change of video
  useEffect(() => {
    return () => {
      videoTexture.image.pause()
      videoTexture.image.currentTime = 0
    }
  }, [videoTexture])

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1, height]} />
      <meshBasicMaterial map={videoTexture} />
    </mesh>
  )
}
