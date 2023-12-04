export function SkeletonImages(props: { count: number; spacingY: number }) {
  const images = []
  for (let i = 0; i < props.count; i++) {
    images.push(
      <group key={i} position={[0, i * props.spacingY, 0]}>
        <SkeletonImage />
      </group>,
    )
  }
  return <group>{images}</group>
}

export function SkeletonImage() {
  return (
    <mesh scale={[4.2, 4.2, 1]}>
      <planeGeometry args={[1, 9 / 16]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}
