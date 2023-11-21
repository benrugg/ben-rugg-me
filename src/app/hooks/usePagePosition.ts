import { useThree } from "@react-three/fiber"

type PagePositionResult = { yPosition: number; styleTop: string }

export function usePagePosition(page: number): PagePositionResult {
  const { viewport } = useThree()

  return { yPosition: -page * viewport.height, styleTop: `${page * 100}vh` }
}
