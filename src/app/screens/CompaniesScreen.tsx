import { useScreenStore } from "@/app/stores/screenStore"
import { TempImage, TempImageHtml } from "@/app/components/TempImage"

export function CompaniesScreen() {
  return (
    <>
      <TempImage page={0} />
      <TempImage page={1} />
      <TempImage page={2} />
      <TempImage page={3} />
    </>
  )
}

export function CompaniesScreenTransition(props: { children: React.ReactNode }) {
  // get the current screen
  const screen = useScreenStore((state) => state.screen)

  // get whether we're transitioning
  const isTransitioning = useScreenStore((state) => state.isTransitioning)

  // get whether we're visible
  const isVisible = screen === "companies" || isTransitioning

  return <group visible={isVisible}>{props.children}</group>
}

export function CompaniesScreenHtml() {
  return (
    <>
      <TempImageHtml page={0} />
      <TempImageHtml page={1} />
      <TempImageHtml page={2} />
      <TempImageHtml page={3} />
    </>
  )
}
