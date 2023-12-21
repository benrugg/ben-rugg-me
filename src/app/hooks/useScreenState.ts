import { useScreenStore } from "@/app/stores/screenStore"

export const useScreenState = (screen: string) => {
  const {
    currentScreen,
    isScreenActive,
    isScreenVisible,
    screenTransitioningTo,
    screenTransitioningFrom,
    isScreenReady,
    sectionIndex,
    isTextContentVisibleOnMobile,
    hasSeenSwipeInstructions,
  } = useScreenStore()

  return {
    currentScreen,
    isActive: isScreenActive(screen),
    isVisible: isScreenVisible(screen),
    isTransitioningTo: screenTransitioningTo === screen,
    isTransitioningFrom: screenTransitioningFrom === screen,
    isScreenReady: isScreenReady && currentScreen === screen,
    sectionIndex,
    isTextContentVisibleOnMobile,
    hasSeenSwipeInstructions,
  }
}
