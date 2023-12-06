import { create } from "zustand"

const transitionDuration = 1000

interface NavigationStore {
  screen: string
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

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  screen: "welcome",
  screenTransitioningTo: undefined,
  screenTransitioningFrom: undefined,
  isScreenReady: true,
  transitioningTimeoutId: undefined,
  setScreen: (screen) => {
    // get current state
    const { screen: currentScreen, transitioningTimeoutId } = get()
    if (currentScreen === screen) return

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
      screen,
      screenTransitioningTo: screen,
      screenTransitioningFrom: currentScreen,
      isScreenReady: false,
      transitioningTimeoutId: newTransitioningTimeoutId,
    })
  },
  isScreenVisible: (screen) => {
    const { screen: currentScreen, screenTransitioningTo, screenTransitioningFrom } = get()
    return screen === screenTransitioningTo || screen === screenTransitioningFrom || screen === currentScreen
  },
  sectionIndex: 0,
  maxSections: 6,
  screensWithSections: ["companies", "projects"],
  incrementSectionIndex: () => {
    const { screen, screensWithSections, sectionIndex, maxSections } = get()
    if (!screensWithSections.includes(screen) || sectionIndex === maxSections - 1) return

    set({ sectionIndex: sectionIndex + 1 })
  },
  decrementSectionIndex: () => {
    const { screen, screensWithSections, sectionIndex } = get()
    if (!screensWithSections.includes(screen) || sectionIndex === 0) return

    set({ sectionIndex: sectionIndex - 1 })
  },
}))
