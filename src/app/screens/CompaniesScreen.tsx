import { useNavigationStore } from "@/app/stores/navigationStore"
import { TempImage, TempImageHtml } from "@/app/components/TempImage"

export function CompaniesScreen() {
  return (
    <>
      <TempImage />
    </>
  )
}

export function CompaniesScreenTransition(props: { children: React.ReactNode }) {
  // get the current screen
  const screen = useNavigationStore((state) => state.screen)

  // get whether we're transitioning
  const isTransitioning = useNavigationStore((state) => state.isTransitioning)

  // get whether we're visible
  const isVisible = screen === "companies" || isTransitioning

  return <group visible={isVisible}>{props.children}</group>
}

export function CompaniesScreenHtml() {
  // get the current section index
  const sectionIndex = useNavigationStore((state) => state.sectionIndex)

  return (
    <>
      <TempImageHtml tempNum={sectionIndex} />
    </>
  )
}
