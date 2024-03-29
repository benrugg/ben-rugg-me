import { create } from "zustand"
import { companyInfo } from "@/app/data/companies"
import { projectInfo } from "@/app/data/projects"

const transitionDuration = 1000
const stillVisibleDuration = 3000

interface ScreenStore {
  currentScreen: string
  previousScreen: string | undefined
  screenTransitioningTo: string | undefined
  screenTransitioningFrom: string | undefined
  isScreenReady: boolean
  transitioningTimeoutId: NodeJS.Timeout | undefined
  stillVisibleTimeoutId: NodeJS.Timeout | undefined
  setScreen: (screen: string) => void
  isScreenActive: (screen: string) => boolean
  isScreenVisible: (screen: string) => boolean
  sectionIndex: number
  setSectionIndex: (sectionIndex: number) => void
  incrementSectionIndex: () => void
  decrementSectionIndex: () => void
  maxSections: number
  setMaxSections: (maxSections: number) => void
  screensWithSections: string[]
  slideIndexProxy: number
  incrementSlideIndex: () => void
  decrementSlideIndex: () => void
  allowSwiping: boolean
  setAllowSwiping: (allowSwiping: boolean) => void
  isTextContentVisibleOnMobile: boolean
  setIsTextContentVisibleOnMobile: (isTextContentVisibleOnMobile: boolean) => void
  hasSeenSwipeInstructions: boolean
  setHasSeenSwipeInstructions: (hasSeenSwipeInstructions: boolean) => void
}

export const useScreenStore = create<ScreenStore>((set, get) => ({
  currentScreen: "welcome",
  previousScreen: undefined,
  screenTransitioningTo: undefined,
  screenTransitioningFrom: undefined,
  isScreenReady: true,
  transitioningTimeoutId: undefined,
  stillVisibleTimeoutId: undefined,
  setScreen: (newScreen) => {
    // get current state
    const { currentScreen, transitioningTimeoutId, stillVisibleTimeoutId } = get()
    if (currentScreen === newScreen) return

    // clear any existing timeouts
    clearTimeout(transitioningTimeoutId)
    clearTimeout(stillVisibleTimeoutId)

    // clear any flags that won't be relevant anymore
    set({ isTextContentVisibleOnMobile: false })

    // create new timeout to update state in a moment
    const newTransitioningTimeoutId = setTimeout(() => {
      set({
        screenTransitioningTo: undefined,
        screenTransitioningFrom: undefined,
        isScreenReady: true,
        sectionIndex: 0,
      })
    }, transitionDuration)

    // create new timeout to update state a little later
    const newStillVisibleTimeoutId = setTimeout(() => {
      set({ previousScreen: undefined })
    }, stillVisibleDuration)

    // set new state
    set({
      currentScreen: newScreen,
      previousScreen: currentScreen,
      screenTransitioningTo: newScreen,
      screenTransitioningFrom: currentScreen,
      isScreenReady: false,
      transitioningTimeoutId: newTransitioningTimeoutId,
      stillVisibleTimeoutId: newStillVisibleTimeoutId,
    })

    // if we're moving to a screen with sections, set the max sections
    if (get().screensWithSections.includes(newScreen)) {
      if (newScreen === "companies") {
        set({ maxSections: companyInfo.length })
      } else if (newScreen === "projects") {
        set({ maxSections: projectInfo.length })
      }
    }
  },
  isScreenActive: (screen) => {
    const { currentScreen, screenTransitioningTo, screenTransitioningFrom } = get()
    return screen === screenTransitioningTo || screen === screenTransitioningFrom || screen === currentScreen
  },
  isScreenVisible: (screen) => {
    const { currentScreen, previousScreen } = get()
    return screen === previousScreen || screen === currentScreen
  },
  sectionIndex: 0,
  setSectionIndex: (sectionIndex) => {
    set({ sectionIndex })
  },
  incrementSectionIndex: () => {
    const { allowSwiping, currentScreen, screensWithSections, sectionIndex, maxSections, isTextContentVisibleOnMobile } = get()
    if (!allowSwiping || isTextContentVisibleOnMobile || !screensWithSections.includes(currentScreen) || sectionIndex === maxSections - 1) return

    set({ sectionIndex: sectionIndex + 1 })
  },
  decrementSectionIndex: () => {
    const { allowSwiping, currentScreen, screensWithSections, sectionIndex, isTextContentVisibleOnMobile } = get()
    if (!allowSwiping || isTextContentVisibleOnMobile || !screensWithSections.includes(currentScreen) || sectionIndex === 0) return

    set({ sectionIndex: sectionIndex - 1 })
  },
  maxSections: 6,
  setMaxSections: (maxSections) => {
    set({ maxSections })
  },
  screensWithSections: ["companies", "projects"],
  slideIndexProxy: 0,
  incrementSlideIndex: () => {
    const { allowSwiping, slideIndexProxy } = get()
    if (!allowSwiping) return

    set({ slideIndexProxy: slideIndexProxy + 1 })
  },
  decrementSlideIndex: () => {
    const { allowSwiping, slideIndexProxy } = get()
    if (!allowSwiping) return

    set({ slideIndexProxy: slideIndexProxy - 1 })
  },
  allowSwiping: true,
  setAllowSwiping: (allowSwiping) => {
    if (allowSwiping) {
      setTimeout(() => {
        set({ allowSwiping })
      }, 100)
    } else {
      set({ allowSwiping })
    }
  },
  isTextContentVisibleOnMobile: false,
  setIsTextContentVisibleOnMobile: (isTextContentVisibleOnMobile) => {
    set({ isTextContentVisibleOnMobile })
  },
  hasSeenSwipeInstructions: false,
  setHasSeenSwipeInstructions: (hasSeenSwipeInstructions) => {
    set({ hasSeenSwipeInstructions })
  },
}))
