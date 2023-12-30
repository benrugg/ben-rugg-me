import PageContent from "@/app/components/static-content/MadisonPageContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Madison, WI // Ben Rugg",
  description: "A hidden gem of a city, Madison, WI.",
}

export default function Page() {
  return <PageContent />
}
