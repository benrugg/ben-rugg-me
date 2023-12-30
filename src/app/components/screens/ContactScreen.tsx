import Image from "next/image"
import { useScreenState } from "@/app/hooks/useScreenState"
import { firaCode } from "@/app/fonts/fonts"
import CloseButton from "@/app/components/CloseButton"

export function ContactScreenHtml() {
  // get the current screen state
  const { isActive, isTransitioningTo, isScreenReady } = useScreenState("contact")

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
              <CloseButton />
            </div>
          </div>
          <div className="mx-auto relative fullsizedevice:top-[-40px] overflow-y-scroll overflow-x-hidden hide-scrollbar">
            <p className="text-aqua uppercase tracking-wide fade-and-slide-in-with-delay text-[17px]">/Get In Touch</p>

            <div className="space-y-6 mt-6 text-sm uppercase tracking-wide fade-and-slide-in-with-delay" style={{ animationDelay: "0.7s" }}>
              <div>
                <p>/LinkedIn</p>
                <p className="mt-1">
                  <a className="lowercase text-aqua hover:text-white" href="https://www.linkedin.com/in/benrugg/" target="_blank">
                    @benrugg
                  </a>
                </p>
              </div>
              <div>
                <p>/Email</p>
                <p className="mt-1">
                  <a className="lowercase text-aqua hover:text-white" href="mailto:benrugg@gmail.com">
                    benrugg@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="text-center uppercase text-[10px] tracking-wide md:pt-6 pt-9 pb-4">
            <p>&nbsp;</p>
          </div>
        </div>
      )}
    </>
  )
}
