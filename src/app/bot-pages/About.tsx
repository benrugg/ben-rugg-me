import Image from "next/image"
import { AboutContentBody, AboutContentFooter } from "@/app/components/AboutContent"
import FooterForBot from "./Footer"

export default function AboutForBot() {
  return (
    <>
      <h1 className="uppercase tracking-wider text-2xl my-6 text-aqua">/Crafting Interactive Experiences Since 2000</h1>
      <div className="flex justify-center items-start md:flex-row flex-col md:space-x-8 space-x-0 md:space-y-0 space-y-8 max-w-4xl mx-auto my-20">
        <Image
          src="/images/about/ben-rugg-headshot.jpg"
          alt="Ben Rugg Smiling"
          width={1500}
          height={1172}
          className="lg:max-w-md md:max-w-sm max-w-md w-full h-auto mx-auto"
        />
        <div className="text-sm text-left space-y-5">
          <AboutContentBody />
        </div>
      </div>
      <div className="uppercase text-[10px] tracking-wide mt-28 mb-4 space-y-1">
        <AboutContentFooter />
      </div>
      <FooterForBot showAllLinks={true} />
    </>
  )
}
