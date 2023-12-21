import Image from "next/image"
import { useScreenState } from "@/app/hooks/useScreenState"
import { navigateHome } from "@/utils/screen-navigation"
import { firaCode } from "@/fonts/fonts"
import CloseButton from "@/app/components/CloseButton"

export function AboutScreenHtml() {
  // get the current screen state
  const { isActive, isTransitioningTo, isScreenReady } = useScreenState("about")

  // prepare animation classes
  const cssClass = isTransitioningTo || isScreenReady ? "fade-in" : "fade-out"

  return (
    <>
      {isActive && (
        <div
          className={`flex flex-col justify-between h-[100dvh] w-screen absolute px-6 bg-black text-white bg-opacity-80 ${cssClass} ${firaCode.className}`}
        >
          <div className="flex flex-row justify-end p-1">
            <div className="relative left-6">
              <CloseButton onClick={navigateHome} />
            </div>
          </div>
          <div className="flex flex-col items-center relative fullsizedevice:top-[-30px] overflow-y-scroll overflow-x-hidden">
            <p className="text-aqua uppercase tracking-wide fade-and-slide-in-with-delay text-[17px]">/Crafting Interactive Experiences Since 2000</p>

            <div className="flex sm:flex-row flex-col justify-center items-start max-w-5xl sm:space-x-8 sm:space-y-0 space-y-7 mt-6">
              <div className="mt-3 max-w-md sliced-image-container fade-and-slide-in-with-delay" style={{ animationDelay: "0.7s" }}>
                <Image className="opacity-0" src={"/images/about/ben-rugg-headshot.jpg"} width={1500} height={1172} alt="Ben Rugg Smiling" />
                <div className="sliced-image">
                  <Image src={"/images/about/ben-rugg-headshot.jpg"} width={1500} height={1172} alt="Ben Rugg Smiling" />
                  <Image src={"/images/about/ben-rugg-headshot.jpg"} width={1500} height={1172} alt="Ben Rugg Smiling" />
                  <Image src={"/images/about/ben-rugg-headshot.jpg"} width={1500} height={1172} alt="Ben Rugg Smiling" />
                </div>
              </div>

              <div className="space-y-5 fade-and-slide-in-with-delay" style={{ animationDelay: "0.9s" }}>
                <p className="text-sm">
                  I&apos;m an expert full-stack engineer and serial entrepreneur who is passionate about creating meaningful interactive experiences.
                </p>
                <p className="text-sm">
                  I had the good fortune to start, build and sell a highly successful startup in the tech space (Clover), which gave me a wealth of
                  experiences. From building and marketing a revolutionary product, to hiring and leading a team of 20, I had an absolute blast
                  learning and growing as an entrepreneur and creator.
                </p>
                <p className="text-sm">
                  Since the sale of Clover, I&apos;ve had the privilege of founding more companies, creating more products, mentoring other
                  entrepreneurs, and investing in meaningful startups.
                </p>
                <p className="text-sm">
                  I love the intersection of technology and design, and I thrive creating user experiences that impact people in a practical way.
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-center uppercase text-[10px] tracking-wide md:pt-6 pt-9 pb-4 space-y-1 fade-and-slide-in-with-delay"
            style={{ animationDelay: "1.1s" }}
          >
            <p>This site was hand crafted in React.js, Next.js, TypeScript, and React-Three-Fiber</p>
            <p>{"//"}</p>
            <p>
              <a className="text-aqua hover:text-white" href="https://github.com/benrugg/ben-rugg-me" target="_blank">
                View Code
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
