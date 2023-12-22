import FooterForBot from "./Footer"
import { resumeSentences } from "@/app/data/resume-sentences"

export default function FullStackEngineerForBot() {
  return (
    <>
      <h1 className="uppercase tracking-wider text-2xl my-6 text-aqua">/Full-Stack Engineer</h1>
      <div className="flex flex-col space-y-6 max-w-4xl mx-auto my-20 text-sm">
        {resumeSentences.map((sentence, index) => (
          <p key={index}>{sentence}</p>
        ))}
      </div>
      <FooterForBot showAllLinks={true} />
    </>
  )
}
