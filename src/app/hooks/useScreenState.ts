import { useScreenStore } from "@/app/stores/screenStore"

export const useScreenState = (screen: string) => {
  const { currentScreen, isScreenVisible, screenTransitioningTo, screenTransitioningFrom, isScreenReady, sectionIndex } = useScreenStore()

  return {
    currentScreen,
    isVisible: isScreenVisible(screen),
    isTransitioningTo: screenTransitioningTo === screen,
    isTransitioningFrom: screenTransitioningFrom === screen,
    isScreenReady: isScreenReady && currentScreen === screen,
    sectionIndex,
  }
}
