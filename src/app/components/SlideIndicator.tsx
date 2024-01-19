import * as THREE from "three"
import { useRef, useState } from "react"
import { Text, useCursor } from "@react-three/drei"
import { useScreenStore } from "@/app/stores/screenStore"
import type { Vector3Array } from "@/types"

function Indicator(props: { position: Vector3Array; isSelected: boolean; onClick: () => void }) {
  // init refs and state
  const [isHovered, setIsHovered] = useState(false)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!)

  // set cursor to pointer when hovering
  useCursor(isHovered && !props.isSelected)

  // set the character to display, and other text properties
  const textChar = props.isSelected ? "x" : "."
  const fontSize = props.isSelected ? 0.019 : 0.042
  const fontScale: Vector3Array = props.isSelected ? [1, 0.8, 1] : [1, 1, 1]
  const textPosition: Vector3Array = props.isSelected ? [0, 0, 0] : [0, 0.01, 0]

  // set the color of the indicator
  const initialColor = props.isSelected ? "#23FCE2" : "white"

  if (materialRef.current) {
    materialRef.current.color.set(isHovered ? "#23FCE2" : initialColor)
  }

  // when the pointer is down/up on the button, set a flag in the screen store
  // so it won't allow swiping
  const screenStore = useScreenStore.getState()
  const handlePointerDown = () => {
    screenStore.setAllowSwiping(false)
  }
  const handlePointerUp = () => {
    screenStore.setAllowSwiping(true)
  }

  // use a mesh for a larger hit area
  return (
    <group position={props.position}>
      <mesh
        position={[0, -0.001, -0.001]}
        onClick={(event) => {
          event.stopPropagation()
          props.onClick()
        }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerOut={() => {
          handlePointerUp()
          setIsHovered(false)
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <planeGeometry args={[0.012, 0.012]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
      <Text font={"/fonts/subset-EireneSans-SemiBold.woff"} fontSize={fontSize} scale={fontScale} position={textPosition}>
        {textChar}
        <meshBasicMaterial ref={materialRef} color={initialColor} />
      </Text>
    </group>
  )
}

export default function SlideIndicator(props: { numSlides: number; currentIndex: number; onClick: (index: number) => void }) {
  // create as many indicator instances as there are slides, positioning
  // each one slightly to the right of the last
  const indicators = []
  for (let i = 0; i < props.numSlides; i++) {
    const position: Vector3Array = [i * 0.013, 0, 0]
    const isSelected = i === props.currentIndex
    indicators.push(<Indicator key={i} position={position} isSelected={isSelected} onClick={() => props.onClick(i)} />)
  }

  // return the indicators
  return <group>{indicators}</group>
}
