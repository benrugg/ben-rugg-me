import PageContent from "@/app/components/static-content/CompaniesAndProjectsPageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects & Software // Ben Rugg",
  description: "Highlights of the web apps, mobile apps and other software and projects I've created.",
}

export default function Page() {
  return <PageContent screen="projects" />
}
