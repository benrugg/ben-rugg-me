import { useVideoTexture } from "@react-three/drei"

const aspectRatio = 16 / 9

export default function PlaneVideo(props: { url: string | undefined }) {
  if (!props.url) return null

  // calculate the height of the video
  const height = 1 / aspectRatio

  // load the video
  const videoTexture = useVideoTexture(props.url)

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1, height]} />
      <meshBasicMaterial map={videoTexture} />
    </mesh>
  )
}
