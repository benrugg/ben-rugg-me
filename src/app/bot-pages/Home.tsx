import FooterForBot from "./Footer"
import Image from "next/image"

export default function HomeForBot() {
  return (
    <>
      <p className="lg:mb-6 mb-20 -mt-5">Digital portfolio of Ben Rugg, expert full-stack engineer and serial entrepreneur.</p>
      <Image
        src="/images/home/home-screenshot.jpg"
        alt="Screen of Companies & Products and a Screen of Projects & Software"
        width={2400}
        height={1303}
        className="max-w-[1460px] w-full h-auto mx-auto mb-16"
      />
      <p className="uppercase tracking-wide text-lg mb-2">View my work:</p>
      <div className="flex justify-center xs:flex-row flex-col xs:space-x-12 space-x-0 xs:space-y-0 space-y-2 text-lg uppercase tracking-wide">
        <p>
          <a className="text-aqua hover:text-white" href="/companies">
            Companies & Products
          </a>
        </p>
        <p>
          <a className="text-aqua hover:text-white" href="/projects">
            Projects & Software
          </a>
        </p>
      </div>
      <FooterForBot />
    </>
  )
}
