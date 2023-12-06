import { useNavigationStore } from "@/app/stores/navigationStore"
import { useScreenState } from "@/app/hooks/useScreenState"
import { TempImage, TempImageHtml } from "@/app/components/TempImage"

export function CompaniesScreen() {
  // get the current screen state
  const { isVisible, isTransitioningTo, isTransitioningFrom, isScreenReady } = useScreenState("companies")

  // TEMP: create sections
  const tempColors = ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#ff99ff", "#99ffff"]

  // TODO: determine if it's ok/best to mount/unmount or if we should just hide/show

  return (
    <group visible={isVisible}>
      {isVisible &&
        tempColors.map((tempColor, index) => (
          <TempImage
            key={index}
            tempColor={tempColor}
            index={index}
            isTransitioningTo={isTransitioningTo}
            isTransitioningFrom={isTransitioningFrom}
            isScreenReady={isScreenReady}
          />
        ))}
    </group>
  )
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
