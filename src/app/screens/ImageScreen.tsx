import { useThree } from "@react-three/fiber"
import FloatingImage from "@/app/components/FloatingImage"
import { usePagePosition } from "@/app/hooks/usePagePosition"

export function ImageScreen(props: { page: number }) {
  const { yPosition } = usePagePosition(props.page)
  const zPosition = 1.5

  // set the image's size dynamically
  const { size } = useThree()
  const desiredPixelWidth = Math.min(size.width, 1200)

  return (
    <group position={[0, yPosition, zPosition]}>
      <FloatingImage url="/images/temp-2.jpg" desiredPixelWidth={desiredPixelWidth} />
    </group>
  )
}

export function ImageScreenHtml(props: { page: number }) {
  const { styleTop } = usePagePosition(props.page)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute" style={{ top: styleTop }}>
      <h1 className="text-6xl font-bold">Page 3</h1>
      <p className="mt-3 text-2xl">Projects...</p>
    </div>
  )
}
