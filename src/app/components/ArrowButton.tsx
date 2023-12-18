import * as THREE from "three"
import { useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Text, useCursor } from "@react-three/drei"
import { useScreenStore } from "@/app/stores/screenStore"
import type { Vector3Array } from "@/types"

export default function ArrowButton(props: { position: Vector3Array; rotation: Vector3Array; onClick: () => void }) {
  // init refs and state
  const [isHovered, setIsHovered] = useState(false)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!)

  // set cursor to pointer when hovering
  useCursor(isHovered)

  // set the color of the arrow
  if (materialRef.current) {
    materialRef.current.color.set(isHovered ? "white" : "#23FCE2")
  }

  // on smaller screens, make the hit area bigger
  const { size } = useThree()
  const hitAreaScaleX = size.width < 1250 ? 0.21 : 0.1
  const hitAreaScaleY = size.width < 1250 ? 0.55 : 0.1

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
    <group position={props.position} rotation={props.rotation}>
      <mesh
        position={[0, 0, -0.001]}
        onClick={props.onClick}
        onPointerEnter={() => setIsHovered(true)}
        onPointerOut={() => {
          handlePointerUp()
          setIsHovered(false)
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <planeGeometry args={[hitAreaScaleX, hitAreaScaleY]} />
        <meshBasicMaterial opacity={0} transparent side={THREE.DoubleSide} />
      </mesh>
      <Text font={"/fonts/subset-EireneSans-Thin.woff"} fontSize={0.09} scale={[0.8, 0.9, 1]}>
        {">"}
        <meshBasicMaterial ref={materialRef} color="#23FCE2" side={THREE.DoubleSide} />
      </Text>
    </group>
  )
}
