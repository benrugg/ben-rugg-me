import { create } from "zustand"

const transitionDuration = 2500

interface NavigationStore {
  screen: string
  isTransitioning: boolean
  isTransitioningTimeoutId: NodeJS.Timeout | undefined
  setScreen: (screen: string) => void
  sectionIndex: number
  maxSections: number
  screensWithSections: string[]
  incrementSectionIndex: () => void
  decrementSectionIndex: () => void
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
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
