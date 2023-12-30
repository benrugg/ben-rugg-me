"use client"

import Image from "next/image"
import Link from "next/link"
import StaticContentWrapper from "@/app/components/static-content/StaticContentWrapper"

export default function PageContent() {
  return (
    <StaticContentWrapper showAllFooterLinks={false}>
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
          <Link href="/companies" className="text-aqua hover:text-white">
            Companies & Products
          </Link>
        </p>
        <p>
          <Link href="/projects" className="text-aqua hover:text-white">
            Projects & Software
          </Link>
        </p>
      </div>
    </StaticContentWrapper>
  )
}
