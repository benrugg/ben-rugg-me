import type { Metadata } from "next"
import "@/app/styles/globals.css"

export const metadata: Metadata = {
  title: "Ben Rugg // Full-Stack Engineer & Creative Entrepreneur",
  description: "Digital portfolio of Ben Rugg, a creative entrepreneur and full-stack engineer in Madison, Wisconsin.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
