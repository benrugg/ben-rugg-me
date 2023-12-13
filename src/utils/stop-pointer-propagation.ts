import type { MouseEvent, TouchEvent } from "react"

// define function to stop propagation of events, so we can scroll internal
// contents without triggering a swipe to a new section
export const stopPropagation = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
  e.stopPropagation()
}

// match events from ReactScrollWheelHandler
export const stopPointerProps = {
  onTouchStart: stopPropagation,
  onTouchEnd: stopPropagation,
  onMouseDown: stopPropagation,
  onMouseUp: stopPropagation,
}

export const stopWheelProps = {
  onWheelCapture: stopPropagation,
}
