import * as THREE from "three"
import { useRef, useState } from "react"
import { Text, useCursor } from "@react-three/drei"
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

  // use a mesh for a larger hit area
  return (
    <group position={props.position} rotation={props.rotation}>
      <mesh position={[0, 0, -0.001]} onClick={props.onClick} onPointerEnter={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshBasicMaterial opacity={0} transparent side={THREE.DoubleSide} />
      </mesh>
      <Text font={"/fonts/subset-EireneSans-Thin.woff"} fontSize={0.09} scale={[0.8, 0.9, 1]}>
        {">"}
        <meshBasicMaterial ref={materialRef} color="#23FCE2" side={THREE.DoubleSide} />
      </Text>
    </group>
  )
}
