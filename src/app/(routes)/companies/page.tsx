import PageContent from "@/app/components/static-content/CompaniesAndProjectsPageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Companies & Products // Ben Rugg",
  description: "The notable companies and products I've built.",
}

export default function Page() {
  return <PageContent screen="companies" />
}
