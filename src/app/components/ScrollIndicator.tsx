import Image from "next/image"
import { useSpring, animated } from "@react-spring/web"
import { firaCode } from "@/fonts/fonts"
import arrowIcon from "@/assets/icons/arrow-icon.svg"

export default function ScrollIndicator(props: { current: number; total: number }) {
  // calculate the position of the scroll indicator
  const scrollPosition = (((props.current - 1) / (props.total - 1)) * 100).toString() + "%"

  // animate the scroll indicator
  const spring1 = useSpring({
    top: scrollPosition,
    config: { tension: 280, friction: 60 },
  })

  const spring2 = useSpring({
    top: scrollPosition,
    config: { tension: 280, friction: 100, mass: 3 },
  })

  const spring3 = useSpring({
    top: scrollPosition,
    config: { tension: 340, friction: 160, mass: 10 },
  })

  return (
    <div className="flex flex-col justify-between items-center h-full text-white uppercase cursor-default pointer-events-none select-none">
      <div>
        <Image src={arrowIcon} alt="up arrow" className="mb-[3px]" />
      </div>
      <div className={`flex flex-row flex-grow items-start ${firaCode.className} text-xs tracking-wide font-normal`}>
        <div className="w-[64px] h-full relative text-gray-400">
          <animated.p className="absolute text-right right-0 -translate-y-1/2" style={spring2}>
            Scroll
            <br />
            /Swipe
          </animated.p>
        </div>
        <div className="w-[38px] h-full relative">
          <div className="flex flex-col justify-between w-full bg-[url('/images/ui/scroller-dashed-line-bg.png')] bg-repeat-y bg-center text-aqua text-center h-full text-[10px] font-bold">
            {Array.from({ length: props.total }).map((_, index) => (
              <p key={index} className="h-[2px] leading-[2px] relative left-[0.5px]">
                -
              </p>
            ))}
          </div>
          <animated.div
            className="absolute lowercase text-aqua w-full h-[10px] leading-[10px] text-center text-[11px] font-bold left-[0.5px] -translate-y-1/2"
            style={spring1}
          >
            x
          </animated.div>
        </div>
        <div className="w-[64px] h-full relative">
          <animated.p className="absolute -translate-y-1/2" style={spring3}>
            <span className="text-aqua">{props.current}</span>/{props.total}
          </animated.p>
        </div>
      </div>
      <div>
        <Image src={arrowIcon} alt="down arrow" className="mt-[3px] rotate-180" />
      </div>
    </div>
  )
}
