const aspectRatio = 16 / 9

export function TempImage() {
  // calculate the height of the image
  const height = 1 / aspectRatio

  return (
    <group scale={[3.2, 3.2, 1]}>
      <mesh rotation={[0, -Math.PI / 5, 0]}>
        <planeGeometry args={[1, height]} />
        <meshStandardMaterial color="#ff9999" transparent />
      </mesh>
    </group>
  )
}

export function TempImageHtml(props: { tempNum: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute">
      <h1 className="text-4xl font-bold text-white">Section {props.tempNum}</h1>
      <p className="text-white">
        From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.
      </p>
    </div>
  )
}
