import { MeshReflectorMaterial, useTexture } from "@react-three/drei"

export default function Ground() {
  const roughnessTexture = useTexture("/images/ground-roughness-texture.jpg")

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
      <planeGeometry args={[25, 15, 1]} />
      <MeshReflectorMaterial
        blur={[256, 256]}
        mixBlur={5}
        // mixStrength={1} // Strength of the reflections
        // mixContrast={1} // Contrast of the reflections
        resolution={256}
        mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        roughnessMap={roughnessTexture}
        metalness={1}
        // depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        // minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        // maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        // depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        // distortion={1} // Amount of distortion based on the distortionMap texture
        // distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
        // debug={0}
        reflectorOffset={0.1} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  )
}
