import PageContent from "@/app/components/static-content/FullStackEngineerPageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Full-Stack Engineer // Ben Rugg",
  description: "I've worked in all the major front-end and back-end languages and frameworks.",
}

export default function Page() {
  return <PageContent />
}
