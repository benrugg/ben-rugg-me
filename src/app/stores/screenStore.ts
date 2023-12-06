import { create } from "zustand"

const transitionDuration = 1000

interface ScreenStore {
  currentScreen: string
  screenTransitioningTo: string | undefined
  screenTransitioningFrom: string | undefined
  isScreenReady: boolean
  transitioningTimeoutId: NodeJS.Timeout | undefined
  setScreen: (screen: string) => void
  isScreenVisible: (screen: string) => boolean
  sectionIndex: number
  maxSections: number
  screensWithSections: string[]
  incrementSectionIndex: () => void
  decrementSectionIndex: () => void
}

export const useScreenStore = create<ScreenStore>((set, get) => ({
  currentScreen: "welcome",
  screenTransitioningTo: undefined,
  screenTransitioningFrom: undefined,
  isScreenReady: true,
  transitioningTimeoutId: undefined,
  setScreen: (newScreen) => {
    // get current state
    const { currentScreen, transitioningTimeoutId } = get()
    if (currentScreen === newScreen) return

    // clear any existing timeouts
    clearTimeout(transitioningTimeoutId)

    // create new timeout
    const newTransitioningTimeoutId = setTimeout(() => {
      set({
        screenTransitioningTo: undefined,
        screenTransitioningFrom: undefined,
        isScreenReady: true,
      })
    }, transitionDuration)

    // set new state
    set({
      currentScreen: newScreen,
      screenTransitioningTo: newScreen,
      screenTransitioningFrom: currentScreen,
      isScreenReady: false,
      transitioningTimeoutId: newTransitioningTimeoutId,
    })
  },
  isScreenVisible: (screen) => {
    const { currentScreen, screenTransitioningTo, screenTransitioningFrom } = get()
    return screen === screenTransitioningTo || screen === screenTransitioningFrom || screen === currentScreen
  },
  sectionIndex: 0,
  maxSections: 6,
  screensWithSections: ["companies", "projects"],
  incrementSectionIndex: () => {
    const { currentScreen, screensWithSections, sectionIndex, maxSections } = get()
    if (!screensWithSections.includes(currentScreen) || sectionIndex === maxSections - 1) return

    set({ sectionIndex: sectionIndex + 1 })
  },
  decrementSectionIndex: () => {
    const { currentScreen, screensWithSections, sectionIndex } = get()
    if (!screensWithSections.includes(currentScreen) || sectionIndex === 0) return

    set({ sectionIndex: sectionIndex - 1 })
  },
}))
