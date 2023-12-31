"use client"

import StaticContentWrapper from "@/app/components/static-content/StaticContentWrapper"
import { companyInfo } from "@/app/data/companies"
import { projectInfo } from "@/app/data/projects"
import type { Content, ContentSlide, ImageSlide, VideoSlide } from "@/types"

function ImgOrVideo(props: { slide: ContentSlide }) {
  if ((props.slide as VideoSlide).video) {
    return (
      <video className="mx-auto" muted loop playsInline controls preload="none">
        <source src={(props.slide as VideoSlide).video} type="video/mp4" />
      </video>
    )
  } else {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={(props.slide as ImageSlide).image} alt="" loading="lazy" />
  }
}

function CompanyOrProject(props: { content: Content }) {
  const TextContent = props.content.text.map((content, index) => {
    return (
      <div key={index} className={`${index === 0 ? "font-semibold text-[17px] tracking-wide uppercase space-y-1" : ""}`}>
        <h4 className="text-aqua mb-0.5 tracking-wide uppercase">{content.title}</h4>
        {content.url ? (
          <div className="contentTextBody">
            <a href={content.url} target="_blank" rel="noreferrer">
              {content.body}
            </a>
          </div>
        ) : (
          <div className="contentTextBody noListStyle" dangerouslySetInnerHTML={{ __html: content.body }} />
        )}
      </div>
    )
  })

  const Slides = props.content.slides.map((slide, index) => {
    return (
      <div key={index} className="">
        <ImgOrVideo slide={slide} />
      </div>
    )
  })

  return (
    <div className="space-y-12">
      <div className="contentTextWrap text-sm space-y-6">{TextContent}</div>
      <div className="space-y-7">{Slides}</div>
    </div>
  )
}

export default function PageContent(props: { screen: string }) {
  // load the desired data
  const companiesOrProjects = props.screen === "companies" ? companyInfo : projectInfo

  // prepare the title
  const titleText = props.screen === "companies" ? "Companies & Products" : "Projects & Software"

  return (
    <StaticContentWrapper showAllFooterLinks={true}>
      <h1 className="uppercase tracking-wider text-2xl my-6">{titleText}</h1>
      <div className="flex justify-center flex-col space-y-64 max-w-4xl mx-auto my-20">
        {companiesOrProjects.map((content, index) => (
          <CompanyOrProject key={index} content={content} />
        ))}
      </div>
    </StaticContentWrapper>
  )
}
