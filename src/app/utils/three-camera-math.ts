import { Size } from "@react-three/fiber"
import * as THREE from "three"

export const visibleHeightAtZDepth = (depth: number, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera) => {
  // throw an error if the camera is OrthographicCamera
  if (camera instanceof THREE.OrthographicCamera) {
    throw new Error("visibleHeightAtZDepth: OrthographicCamera is not supported")
  }

  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z
  if (depth < cameraOffset) depth -= cameraOffset
  else depth += cameraOffset

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth)
}

export const visibleWidthAtZDepth = (depth: number, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera) => {
  // throw an error if the camera is OrthographicCamera
  if (camera instanceof THREE.OrthographicCamera) {
    throw new Error("visibleHeightAtZDepth: OrthographicCamera is not supported")
  }

  const height = visibleHeightAtZDepth(depth, camera)
  return height * camera.aspect
}

export const getScaleForDesiredPixelWidth = (
  desiredPixelWidth: number,
  objectWorldDepth: number,
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  screenSize: Size,
) => {
  const scaleAtFullWidth = visibleWidthAtZDepth(objectWorldDepth, camera)
  return (desiredPixelWidth / screenSize.width) * scaleAtFullWidth
}
