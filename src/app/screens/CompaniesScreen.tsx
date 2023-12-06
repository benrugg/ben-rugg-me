import { useScreenState } from "@/app/hooks/useScreenState"
import { TempImage, TempImageHtml } from "@/app/components/TempImage"
import { companyInfo } from "@/app/data/companies"

export function CompaniesScreen() {
  // get the current screen state
  const { isVisible, isTransitioningTo, isTransitioningFrom, isScreenReady, sectionIndex } = useScreenState("companies")

  // TODO: determine if it's ok/best to mount/unmount or if we should just hide/show
  return (
    <group visible={isVisible}>
      {isVisible &&
        companyInfo.map((content, index) => (
          <TempImage
            key={index}
            index={index}
            content={content}
            sectionIndex={sectionIndex}
            isTransitioningTo={isTransitioningTo}
            isTransitioningFrom={isTransitioningFrom}
            isScreenReady={isScreenReady}
            rotationDirection={index % 2 === 0 ? "right" : "left"}
          />
        ))}
    </group>
  )
}

export function CompaniesScreenHtml() {
  // get the current screen state
  const { isVisible, isTransitioningTo, isTransitioningFrom, isScreenReady, sectionIndex } = useScreenState("companies")

  return (
    <>
      {isVisible &&
        companyInfo.map((content, index) => (
          <TempImageHtml
            key={index}
            index={index}
            sectionIndex={sectionIndex}
            isTransitioningTo={isTransitioningTo}
            isTransitioningFrom={isTransitioningFrom}
            isScreenReady={isScreenReady}
            content={content}
          />
        ))}
    </>
  )
}
