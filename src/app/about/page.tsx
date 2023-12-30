import PageContent from "@/app/components/static-content/AboutPageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About // Ben Rugg",
  description: "Expert full-stack engineer and serial entrepreneur, passionate about creating meaningful interactive experiences.",
}

export default function Page() {
  return <PageContent />
}
