"use client"

import Image from "next/image"
import StaticContentWrapper from "@/app/components/static-content/StaticContentWrapper"

export default function PageContent() {
  return (
    <StaticContentWrapper showAllFooterLinks={true}>
      <Image
        src="/images/madison/madison-easter-egg.jpg"
        width={3456}
        height={1828}
        alt="Easter Egg image of Madison, Wisconsin's Capitol Building with a map of Wisconsin superimposed on it"
      />
    </StaticContentWrapper>
  )
}
