import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import { useScreenStore } from "@/app/stores/screenStore"
import { usePagePosition } from "@/app/hooks/usePagePosition"

const aspectRatio = 16 / 9

export function TempImage(props: { page: number }) {
  // init refs
  const meshRef = useRef<THREE.Mesh>(null!)

  // calculate the height of the image
  const height = 1 / aspectRatio

  // calculate position, based on page
  const { yPosition } = usePagePosition(props.page)

  // get total pages
  const numPages = useScreenStore((state) => state.numPages)

  // on scroll, fade in/out the images
  const data = useScroll()
  useFrame(() => {
    // @ts-ignore
    meshRef.current.material.opacity = data.curve(props.page / numPages, 1 / numPages)
  })

  return (
    <group scale={[3.2, 3.2, 1]} position={[0, yPosition, 1.5]}>
      <mesh ref={meshRef} rotation={[0, -Math.PI / 5, 0]}>
        <planeGeometry args={[1, height]} />
        <meshStandardMaterial color="#ff9999" transparent />
      </mesh>
    </group>
  )
}

export function TempImageHtml(props: { page: number }) {
  // init refs
  const containerRef = useRef<HTMLDivElement>(null!)

  // calculate position, based on page
  const { styleTop } = usePagePosition(props.page)

  // get total pages
  const numPages = useScreenStore((state) => state.numPages)

  // on scroll, fade in/out the images
  const data = useScroll()
  useFrame(() => {
    containerRef.current.style.opacity = data.curve(props.page / numPages, 1 / numPages).toString()
  })

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen w-screen absolute" style={{ top: styleTop }}>
      <h1 className="text-4xl font-bold text-white">Clover</h1>
      <p className="text-white">
        From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.
      </p>
    </div>
  )
}
