import { create } from "zustand"
import { companyInfo } from "@/app/data/companies"
import { projectInfo } from "@/app/data/projects"

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
  setMaxSections: (maxSections: number) => void
  screensWithSections: string[]
  incrementSectionIndex: () => void
  decrementSectionIndex: () => void
  slideIndexProxy: number
  incrementSlideIndex: () => void
  decrementSlideIndex: () => void
  allowSwiping: boolean
  setAllowSwiping: (allowSwiping: boolean) => void
  isTextContentVisibleOnMobile: boolean
  setIsTextContentVisibleOnMobile: (isTextContentVisibleOnMobile: boolean) => void
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

    // clear any flags that won't be relevant anymore
    set({ isTextContentVisibleOnMobile: false })

    // create new timeout to update state in a moment
    const newTransitioningTimeoutId = setTimeout(() => {
      set({
        screenTransitioningTo: undefined,
        screenTransitioningFrom: undefined,
        isScreenReady: true,
      })

      // reset section index if we've moved to a screen without sections
      if (!get().screensWithSections.includes(newScreen)) {
        set({ sectionIndex: 0 })
      }
    }, transitionDuration)

    // set new state
    set({
      currentScreen: newScreen,
      screenTransitioningTo: newScreen,
      screenTransitioningFrom: currentScreen,
      isScreenReady: false,
      transitioningTimeoutId: newTransitioningTimeoutId,
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
  isScreenVisible: (screen) => {
    const { currentScreen, screenTransitioningTo, screenTransitioningFrom } = get()
    return screen === screenTransitioningTo || screen === screenTransitioningFrom || screen === currentScreen
  },
  sectionIndex: 0,
  maxSections: 6,
  setMaxSections: (maxSections) => {
    set({ maxSections })
  },
  screensWithSections: ["companies", "projects"],
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
}))
