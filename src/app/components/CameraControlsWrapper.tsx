import { useCallback, useEffect, useRef } from "react"
import { useScreenStore } from "@/app/stores/screenStore"
import { useThree } from "@react-three/fiber"
import { CameraControls } from "@react-three/drei"

export default function CameraControlsWrapper() {
  // init refs
  const cameraControlsRef = useRef<CameraControls>(null!)

  // declare a function to find a mesh in the scene
  const scene = useThree((state) => state.scene)
  const findMesh = useCallback((name: string) => scene.getObjectByName(name), [scene])

  // get the current screen
  const screen = useScreenStore((state) => state.screen)

  // configure the camera controls
  useEffect(() => {
    cameraControlsRef.current.smoothTime = 0.6
  }, [])

  // when the screen is changed, zoom to one of the floating videos
  useEffect(() => {
    // if we don't have a camera controls ref, quit here
    if (cameraControlsRef.current === null) return

    // for the home page, zoom out
    if (screen === "welcome") {
      cameraControlsRef.current.setTarget(0, 0, 0, true)
      cameraControlsRef.current.setPosition(0, 0, 5, true)
    } else if (screen === "companies" || screen === "projects") {
      // for the companies and projects pages, zoom in to the mesh
      const mesh = findMesh(screen)
      if (mesh) {
        cameraControlsRef.current.fitToBox(mesh, true, { cover: true })
      }
    }
  }, [screen, findMesh])

  return <CameraControls ref={cameraControlsRef} />
}
