import { useScreenStore } from "@/app/stores/screenStore"

export function navigateToScreen(screen: string) {
  const path = screen === "welcome" ? "/" : `/${screen}`
  history.pushState({}, "", path)
  useScreenStore.getState().setScreen(screen)
}

export function navigateHome() {
  navigateToScreen("welcome")
}
