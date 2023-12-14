import { useTexture } from "@react-three/drei"

const aspectRatio = 16 / 9

export default function PlaneImage(props: { url: string }) {
  // calculate the height of the image
  const height = 1 / aspectRatio

  // load the image
  const imageTexture = useTexture(props.url)

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1, height]} />
      <meshBasicMaterial map={imageTexture} />
    </mesh>
  )
}
