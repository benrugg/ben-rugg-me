import Link from "next/link"
import { useScreenState } from "@/app/hooks/useScreenState"
import { ContentDisplay, ContentDisplayHtml } from "@/app/components/ContentDisplay"
import ScrollIndicator from "@/app/components/ScrollIndicator"
import CloseButton from "@/app/components/CloseButton"
import SwipeInstructions from "@/app/components/SwipeInstructions"
import { useScreenStore } from "@/app/stores/screenStore"
import { companyInfo } from "@/app/data/companies"
import { projectInfo } from "@/app/data/projects"
import { firaCode } from "@/fonts/fonts"

export function CompaniesAndProjectsScreen(props: { screen: string }) {
  // get the current screen state
  const { isActive, isTransitioningTo, isTransitioningFrom, isScreenReady, sectionIndex } = useScreenState(props.screen)

  // load the desired data
  const companiesOrProjects = props.screen === "companies" ? companyInfo : projectInfo

  return (
    <group visible={isActive}>
      {isActive &&
        companiesOrProjects.map((content, index) => (
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

export function CompaniesAndProjectsScreenHtml(props: { screen: string }) {
  // get the current screen state
  const { isActive, isTransitioningTo, isTransitioningFrom, isScreenReady, sectionIndex, isTextContentVisibleOnMobile, hasSeenSwipeInstructions } =
    useScreenState(props.screen)

  // load the desired data
  const companiesOrProjects = props.screen === "companies" ? companyInfo : projectInfo

  // declare function to hide text content on mobile
  const hideTextContent = () => {
    useScreenStore.getState().setIsTextContentVisibleOnMobile(false)
  }

  // declare function to hide swipe instructions
  const hideSwipeInstructions = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    useScreenStore.getState().setHasSeenSwipeInstructions(true)
  }

  // prepare animation classes
  const cssClass = isTransitioningTo || isScreenReady ? "fade-in" : "fade-out"
  const justFadeOutCssClass = isTransitioningTo || isScreenReady ? "" : "fade-out"

  return (
    <>
      {isActive && (
        <>
          <div className="flex flex-row justify-between h-[100dvh] w-screen px-6 absolute pointer-events-none">
            <div className="flex flex-col justify-start h-[100dvh] w-1/4 xs:w-1/6 pointer-events-none">
              <div className={`xs:pt-8 pt-7 pointer-events-auto ${cssClass}`}>
                <p
                  className={`${firaCode.className} xs:text-xs text-[13px] tracking-wide font-normal text-aqua uppercase hover:text-white cursor-pointer`}
                >
                  <Link href="/" prefetch={false}>
                    {"<"} Home
                  </Link>
                </p>
              </div>
              <div className="narrowwidth:hidden narrowheight:hidden relative flex-grow">
                {companiesOrProjects.map((content, index) => (
                  <ContentDisplayHtml
                    key={index}
                    index={index}
                    sectionIndex={sectionIndex}
                    isTransitioningTo={isTransitioningTo}
                    isTransitioningFrom={isTransitioningFrom}
                    isScreenReady={isScreenReady}
                    isOnMobile={false}
                    content={content}
                  />
                ))}
              </div>
              <div className="pt-8">
                <p className={`${firaCode.className} xs:text-xs text-[13px] font-normal`}>&nbsp;</p>
              </div>
            </div>
            <div className={`narrowwidth:hidden w-[170px] py-28 ${cssClass}`} style={{ animationDelay: "0.7s" }}>
              <ScrollIndicator current={sectionIndex + 1} total={companiesOrProjects.length} />
            </div>
          </div>
          {isTextContentVisibleOnMobile && (
            <>
              <div className="fullsizedevice:hidden flex flex-col justify-center items-center h-[100dvh] w-screen absolute px-6 bg-black bg-opacity-80 fade-in-fast">
                <ContentDisplayHtml
                  index={sectionIndex}
                  sectionIndex={sectionIndex}
                  isTransitioningTo={isTransitioningTo}
                  isTransitioningFrom={isTransitioningFrom}
                  isScreenReady={isScreenReady}
                  isOnMobile={true}
                  content={companiesOrProjects[sectionIndex]}
                />
              </div>
              <div className="fullsizedevice:hidden absolute top-1 right-1">
                <CloseButton onClick={hideTextContent} />
              </div>
            </>
          )}
          {!hasSeenSwipeInstructions && (
            <div className={`${justFadeOutCssClass}`} onClickCapture={hideSwipeInstructions}>
              <SwipeInstructions />
            </div>
          )}
        </>
      )}
    </>
  )
}
