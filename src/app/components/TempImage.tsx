import { useRef, useState } from "react"
import { useSpring, animated, config } from "@react-spring/three"
import { useNavigationStore } from "@/app/stores/navigationStore"

const aspectRatio = 16 / 9
const offScreenY = 5

export function TempImage(props: {
  index: number
  isTransitioningTo: boolean
  isTransitioningFrom: boolean
  isScreenReady: boolean
  tempColor: string
}) {
  // init refs and state
  const groupRef = useRef<THREE.Group>(null!)
  const [visible, setVisible] = useState(false)

  // calculate the height of the image
  const height = 1 / aspectRatio

  // get the current section index
  const sectionIndex = useNavigationStore((state) => state.sectionIndex)

  // prepare spring animation
  const startPositionY = -offScreenY
  const endPositionY = offScreenY
  const readyPositionY = 0
  const startRotationX = Math.PI / 3
  const endRotationX = -Math.PI / 3
  const readyRotationX = 0

  const spring = useSpring({
    positionY:
      props.isTransitioningTo || sectionIndex < props.index
        ? startPositionY
        : props.isTransitioningFrom || sectionIndex > props.index
        ? endPositionY
        : readyPositionY,
    rotationX:
      props.isTransitioningTo || sectionIndex < props.index
        ? startRotationX
        : props.isTransitioningFrom || sectionIndex > props.index
        ? endRotationX
        : readyRotationX,
    onStart: () => {
      if (sectionIndex === props.index) {
        setVisible(true)
      }
    },
    onRest: () => {
      if (sectionIndex !== props.index) {
        setVisible(false)
      }
    },
    config: config.slow,
  })

  return (
    <animated.group ref={groupRef} scale={[4.2, 4.2, 1]} position-y={spring.positionY} rotation-x={spring.rotationX} visible={visible}>
      <mesh rotation={[0, -Math.PI / 5, 0]}>
        <planeGeometry args={[1, height]} />
        <meshStandardMaterial color={props.tempColor} transparent />
      </mesh>
    </animated.group>
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
