import Particles from "@/app/components/Particles"
import { usePagePosition } from "@/app/hooks/usePagePosition"

export function WelcomeScreen(props: { page: number }) {
  const { yPosition } = usePagePosition(props.page)

  return (
    <group position={[0, yPosition, 0]}>
      <Particles />
    </group>
  )
}

export function WelcomeScreenHtml(props: { page: number }) {
  const { styleTop } = usePagePosition(props.page)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute" style={{ top: styleTop }}>
      <h1 className="text-6xl font-bold text-slate-600">Ben Rugg</h1>
      <p className="mt-3 font-light text-lg text-slate-700">web / software / digital</p>
    </div>
  )
}
