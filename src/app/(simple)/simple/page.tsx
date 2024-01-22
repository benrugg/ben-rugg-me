import PageContent from "@/app/components/static-content/SimplePageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ben Rugg // Full-Stack Engineer and Serial Entrepreneur // Simple Portfolio Page",
  description:
    "Digital portfolio of Ben Rugg // Serial Entrepreneur and Full-Stack Engineer in Madison, Wisconsin. This is my simple portfolio page.",
}

export default function Page() {
  return <PageContent />
}
