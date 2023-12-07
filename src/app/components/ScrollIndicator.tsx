import Image from "next/image"
import { firaCode } from "@/fonts/fonts"
import arrowIcon from "@/assets/icons/arrow-icon.svg"

export default function ScrollIndicator(props: { current: number; total: number }) {
  // calculate the position of the scroll indicator
  const scrollPosition = (((props.current - 1) / (props.total - 1)) * 100).toString() + "%"

  return (
    <div className="flex flex-col justify-between items-center h-full text-white uppercase cursor-default">
      <div>
        <Image src={arrowIcon} alt="up arrow" className="mb-[3px]" />
      </div>
      <div className={`flex flex-row flex-grow items-start ${firaCode.className} text-xs tracking-wide font-normal`}>
        <div className="w-[64px] h-full relative">
          <p className="absolute text-right right-0 -translate-y-1/2" style={{ top: scrollPosition }}>
            Scroll
            <br />
            /Swipe
          </p>
        </div>
        <div className="w-[42px] h-full relative">
          <div className="flex flex-col justify-between w-full bg-[url('/images/ui/scroller-dashed-line-bg.png')] bg-repeat-y bg-center text-aqua text-center h-full text-[10px] font-bold">
            {Array.from({ length: props.total }).map((_, index) => (
              <p key={index} className="h-[2px] leading-[2px] relative left-[0.5px]">
                -
              </p>
            ))}
          </div>
          <div
            className="absolute lowercase text-aqua w-full h-[10px] leading-[10px] text-center text-[11px] font-bold left-[0.5px] -translate-y-1/2"
            style={{ top: scrollPosition }}
          >
            x
          </div>
        </div>
        <div className="w-[64px] h-full relative">
          <p className="absolute -translate-y-1/2" style={{ top: scrollPosition }}>
            <span className="text-aqua">{props.current}</span>/{props.total}
          </p>
        </div>
      </div>
      <div>
        <Image src={arrowIcon} alt="down arrow" className="mt-[3px] rotate-180" />
      </div>
    </div>
  )
}
