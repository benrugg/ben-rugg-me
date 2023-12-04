const aspectRatio = 16 / 9

export function CompaniesScreen() {
  // calculate the height of the image
  const height = 1 / aspectRatio

  return (
    <>
      <group scale={[4.2, 4.2, 1]}>
        <mesh rotation={[0, -Math.PI / 5, 0]}>
          <planeGeometry args={[1, height, 5, 5]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      <group scale={[4.2, 4.2, 1]} position={[0, -6, 0]}>
        <mesh rotation={[0, -Math.PI / 5, 0]}>
          <planeGeometry args={[1, height, 5, 5]} />
          <meshStandardMaterial color="#ff9999" />
        </mesh>
      </group>
    </>
  )
}

export function CompaniesScreenHtml() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute">
        <h1 className="text-4xl font-bold text-white">Clover</h1>
        <p className="text-white">
          From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen absolute" style={{ top: "100vh" }}>
        <h1 className="text-4xl font-bold text-white">Clover</h1>
        <p className="text-white">
          From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.
        </p>
      </div>
    </>
  )
}
