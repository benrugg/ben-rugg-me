import { use, useEffect, useRef } from "react"
import { useNavigation } from "@/app/hooks/useNavigation"
import { useThree } from "@react-three/fiber"
import { CameraControls } from "@react-three/drei"
import path from "path"

export default function CameraControlsWrapper() {
  // init refs
  const cameraControlsRef = useRef<CameraControls>(null!)

  // declare a function to find a mesh in the scene
  const scene = useThree((state) => state.scene)
  const findMesh = (name: string) => scene.getObjectByName(name)

  // configure the camera controls
  useEffect(() => {
    cameraControlsRef.current.smoothTime = 0.6
  }, [])

  // when the route is changed, zoom to one of the floating videos
  useNavigation({
    on: {
      routeChanged: ({ pathname, searchParams }: { pathname: string | null; searchParams: URLSearchParams | null }) => {
        // if we don't have a camera controls ref, quit here
        if (cameraControlsRef.current === null) return

        // for the home page, zoom out
        if (pathname === "/") {
          cameraControlsRef.current.setTarget(0, 0, 0, true)
          cameraControlsRef.current.setPosition(0, 0, 5, true)
        } else if (pathname === "/companies" || pathname === "/projects") {
          // for the companies and projects pages, zoom in to the mesh
          const meshName = pathname.replace("/", "")
          const mesh = findMesh(meshName)
          if (mesh) {
            cameraControlsRef.current.fitToBox(mesh, true, { cover: true })
          }
        }
      },
    },
  })

  return <CameraControls ref={cameraControlsRef} />
}
