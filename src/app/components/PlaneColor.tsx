const aspectRatio = 16 / 9

export default function PlaneColor() {
  // calculate the height of the mesh
  const height = 1 / aspectRatio

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1, height]} />
      <meshBasicMaterial color="aqua" />
    </mesh>
  )
}
