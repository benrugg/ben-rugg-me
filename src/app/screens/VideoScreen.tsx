import { useThree } from "@react-three/fiber"
import FloatingVideo from "@/app/components/FloatingVideo"
import { usePagePosition } from "@/app/hooks/usePagePosition"

export function VideoScreen(props: { page: number }) {
  const { yPosition } = usePagePosition(props.page)

  // set the video's size dynamically
  const { size } = useThree()
  const desiredPixelWidth = Math.min(size.width, 1200)

  return (
    <group position={[0, yPosition, 0]}>
      <FloatingVideo url="/video/ai-render-demo.mp4" desiredPixelWidth={desiredPixelWidth} />
    </group>
  )
}

export function VideoScreenHtml(props: { page: number }) {
  const { styleTop } = usePagePosition(props.page)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute" style={{ top: styleTop }}>
      <h1 className="text-6xl font-bold">Page 2</h1>
      <p className="mt-3 text-2xl">Projects...</p>
    </div>
  )
}
