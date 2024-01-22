import Image from "next/image"
import { figtree } from "@/app/fonts/fonts"

export default function PageContent() {
  return (
    <div className="xs:px-6 px-4">
      <div className={`max-w-[854px] mx-auto py-14 grid grid-cols-12 gap-x-4 gap-y-6 ${figtree.className}`}>
        <div className="col-span-12 md:col-span-4">
          <Image
            className="rounded-full w-full xs:max-w-[16rem] max-w-[12rem] h-auto border-white border-4 relative md:-left-1 md:mx-0 mx-auto"
            src="/images/simple/ben-rugg-headshot-square.jpg"
            width={1000}
            height={1000}
            alt="Headshot of Ben Rugg, smiling"
          />
        </div>
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold md:text-left text-center tracking-tight">Ben Rugg // Engineer & Entreprenuer</h1>
          <h2 className="text-lg font-light md:text-left text-center mt-1">20+ years of experience as a founder and full-stack software engineer.</h2>
          <h2 className="text-lg font-light md:text-left text-center">I love creating digital experiences.</h2>
        </div>
        <div className="col-span-12 text-lg tracking-slightlytight space-y-4">
          <p className="mt-4">
            I&apos;m the co-founder of{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://www.cloversites.com/">
              Clover
            </a>{" "}
            and{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://www.echoprayer.com">
              Echo
            </a>
            . I&apos;ve created dozens of{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://dailygood.us">
              products
            </a>
            ,{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://github.com/benrugg/prism-palette">
              digital experiences
            </a>{" "}
            and{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://blendermarket.com/products/ai-render">
              open source projects
            </a>
            . I invest in{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://expinstitute.com/">
              meaningful
            </a>{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://www.novomoto.net/en/home/">
              startups
            </a>
            , real estate and{" "}
            <a className="text-soft-blue underline hover:no-underline" href="https://kingdomindustry.com/">
              architectural design
            </a>
            .
          </p>
          <p>I mentor and advise early stage startups and students who are passionate about technology, AI or design.</p>
        </div>
        <div className="col-span-12 text-lg">
          <hr className="my-10 border-zinc-300 max-w-[12rem] mx-auto" />
        </div>
        <div className="col-span-12 text-lg">
          <p className="text-center space-x-6">
            <a className="text-soft-blue underline hover:no-underline" href="/">
              Portfolio
            </a>
            <span className="font-light tracking-tighter">{" // "}</span>
            <a className="text-soft-blue underline hover:no-underline" href="https://www.linkedin.com/in/benrugg/">
              LinkedIn
            </a>
            <span className="font-light tracking-tighter">{" // "}</span>
            <a className="text-soft-blue underline hover:no-underline" href="https://github.com/benrugg">
              Github
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
