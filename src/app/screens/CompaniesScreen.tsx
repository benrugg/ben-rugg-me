import { useRouter } from "next/navigation"
import { useScreenState } from "@/app/hooks/useScreenState"
import { ContentDisplay, ContentDisplayHtml } from "@/app/components/ContentDisplay"
import ScrollIndicator from "@/app/components/ScrollIndicator"
import { companyInfo } from "@/app/data/companies"
import { firaCode } from "@/fonts/fonts"

export function CompaniesScreen() {
  // get the current screen state
  const { isVisible, isTransitioningTo, isTransitioningFrom, isScreenReady, sectionIndex } = useScreenState("companies")

  // TODO: determine if it's ok/best to mount/unmount or if we should just hide/show
  return (
    <group visible={isVisible}>
      {isVisible &&
        companyInfo.map((content, index) => (
          <ContentDisplay
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

  // get the router
  const router = useRouter()

  // declare function to go back to the home screen
  const goHome = () => {
    router.push("/")
  }

  return (
    <>
      {isVisible && (
        <div className="flex flex-row justify-between min-h-screen w-screen px-6 absolute pointer-events-none">
          <div className="flex flex-col justify-start min-h-screen w-1/6 pointer-events-none">
            <div className="pt-8 pointer-events-auto">
              <p
                className={`${firaCode.className} text-xs tracking-wide font-normal text-aqua uppercase hover:text-white cursor-pointer`}
                onClick={goHome}
              >
                {"<"} Back
              </p>
            </div>
            <div className="relative flex-grow">
              {companyInfo.map((content, index) => (
                <ContentDisplayHtml
                  key={index}
                  index={index}
                  sectionIndex={sectionIndex}
                  isTransitioningTo={isTransitioningTo}
                  isTransitioningFrom={isTransitioningFrom}
                  isScreenReady={isScreenReady}
                  content={content}
                />
              ))}
            </div>
            <div className="pt-8">
              <p className={`${firaCode.className} text-xs font-normal`}>&nbsp;</p>
            </div>
          </div>
          <div className="w-[170px] py-28 pointer-events-auto">
            <ScrollIndicator current={sectionIndex + 1} total={companyInfo.length} />
          </div>
        </div>
      )}
    </>
  )
}
