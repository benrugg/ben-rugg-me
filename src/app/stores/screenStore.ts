import { create } from "zustand"

interface ScreenStore {
  screen: string
  setScreen: (screen: string) => void
}

export const useScreenStore = create<ScreenStore>((set) => ({
  screen: "welcome",
  setScreen: (screen) => set({ screen }),
}))
