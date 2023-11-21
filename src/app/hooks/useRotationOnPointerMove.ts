import { MathUtils } from "three"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { use, type MutableRefObject } from "react"

type RotationConfig = {
  rotationXAmount?: number
  rotationYAmount?: number
  rotationDamping?: number
}

export function useRotationOnPointerMove(ref: MutableRefObject<THREE.Object3D>): void
export function useRotationOnPointerMove(ref: MutableRefObject<THREE.Object3D>, rotationScale: number): void
export function useRotationOnPointerMove(ref: MutableRefObject<THREE.Object3D>, rotationConfig: RotationConfig): void
export function useRotationOnPointerMove(ref: MutableRefObject<THREE.Object3D>, rotationScaleOrConfig?: number | RotationConfig) {
  // declare default values
  let rotationXAmount = -0.01
  let rotationYAmount = 0.02
  let rotationDamping = 2.75

  // if no scale or config is passed, use default values
  rotationScaleOrConfig = rotationScaleOrConfig ?? 1

  // if config is passed, override default values
  if (typeof rotationScaleOrConfig === "object") {
    const { rotationXAmount: x, rotationYAmount: y, rotationDamping: d } = rotationScaleOrConfig
    rotationXAmount = x ?? rotationXAmount
    rotationYAmount = y ?? rotationYAmount
    rotationDamping = d ?? rotationDamping
  } else {
    // else, scale the rotation by the rotationScale
    rotationXAmount *= rotationScaleOrConfig
    rotationYAmount *= rotationScaleOrConfig
  }

  // rotate the ref (3d object or group) on pointer move
  useFrame((state, delta) => {
    if (rotationXAmount) {
      ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, state.pointer.y * Math.PI * rotationXAmount, rotationDamping, delta)
    }
    if (rotationYAmount) {
      ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, state.pointer.x * Math.PI * rotationYAmount, rotationDamping, delta)
    }
  })
}
