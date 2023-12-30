"use client"

import StaticPageFooter from "@/app/components/static-content/StaticPageFooter"
import { useShowStaticContent } from "@/app/hooks/useShowStaticContent"
import { firaCode } from "@/fonts/fonts"

export default function StaticContentWrapper(props: { children: React.ReactNode; showAllFooterLinks?: boolean }) {
  const { staticContentCSS } = useShowStaticContent()

  return (
    <div className={`${staticContentCSS} text-center text-white ${firaCode.className} p-6`}>
      <h1 className="uppercase tracking-widest text-3xl mt-6 mb-10">Ben Rugg</h1>
      {props.children}
      <StaticPageFooter showAllLinks={props.showAllFooterLinks} />
    </div>
  )
}
