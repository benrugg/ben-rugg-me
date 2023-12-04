import { create } from "zustand"

const transitionDuration = 4500

interface ScreenStore {
  screen: string
  isTransitioning: boolean
  isTransitioningTimeoutId: NodeJS.Timeout | undefined
  setScreen: (screen: string) => void
  numPages: number
}

export const useScreenStore = create<ScreenStore>((set, get) => ({
  screen: "welcome",
  isTransitioning: false,
  isTransitioningTimeoutId: undefined,
  setScreen: (screen) => {
    const { screen: currentScreen, isTransitioningTimeoutId } = get()
    if (currentScreen === screen) return

    clearTimeout(isTransitioningTimeoutId)

    const newIsTransitioningTimeoutId = setTimeout(() => {
      set({ isTransitioning: false })
    }, transitionDuration)

    set({ screen, isTransitioning: true, isTransitioningTimeoutId: newIsTransitioningTimeoutId })
  },
  numPages: 5,
}))
