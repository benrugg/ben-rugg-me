import { useScreenStore } from "@/app/stores/screenStore"

export const useScreenState = (screen: string) => {
  const { screen: currentScreen, isScreenVisible, screenTransitioningTo, screenTransitioningFrom, isScreenReady, sectionIndex } = useScreenStore()

  return {
    isVisible: isScreenVisible(screen),
    isTransitioningTo: screenTransitioningTo === screen,
    isTransitioningFrom: screenTransitioningFrom === screen,
    isScreenReady: isScreenReady && currentScreen === screen,
    sectionIndex,
  }
}
