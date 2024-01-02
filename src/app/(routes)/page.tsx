import PageContent from "@/app/components/static-content/HomePageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ben Rugg // Full-Stack Engineer and Serial Entrepreneur",
  description: "Digital portfolio of Ben Rugg // Serial Entrepreneur and Full-Stack Engineer in Madison, Wisconsin.",
}

export default function Page() {
  return <PageContent />
}
