import Image from "next/image"
import pointerIcon from "@/assets/icons/pointer-icon.svg"
import { firaCode } from "@/app/fonts/fonts"

export default function SwipeInstructions() {
  return (
    <div className="fullsizedevice:hidden fade-in-with-long-delay">
      <div className="flex flex-col justify-center items-center h-[100dvh] w-screen absolute bg-black bg-opacity-50">
        <div className="relative top-5 left-1 swipe-up">
          <Image className="w-14 h-auto -rotate-12" src={pointerIcon} width={788} height={985} alt="pointer hand" />
        </div>
      </div>
      <div
        className={`flex flex-col items-center h-[100dvh] w-screen absolute ${firaCode.className} text-white text-[13px] tracking-wide uppercase text-center`}
      >
        <div className="absolute top-3/4 -translate-y-1/2 space-y-1.5">
          <p>Tap for description</p>
          <p>{"//"}</p>
          <p>swipe for more</p>
        </div>
      </div>
    </div>
  )
}
