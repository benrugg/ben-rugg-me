import { useNavigationStore } from "@/app/stores/navigationStore"

export const useScreenState = (screen: string) => {
  const { screen: currentScreen, isScreenVisible, screenTransitioningTo, screenTransitioningFrom, isScreenReady, sectionIndex } = useNavigationStore()

  return {
    isVisible: isScreenVisible(screen),
    isTransitioningTo: screenTransitioningTo === screen,
    isTransitioningFrom: screenTransitioningFrom === screen,
    isScreenReady: isScreenReady && currentScreen === screen,
    sectionIndex,
  }
}
