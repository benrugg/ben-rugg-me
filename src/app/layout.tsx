import type { Metadata } from "next"
import "@/app/styles/globals.css"

export const metadata: Metadata = {
  title: "Test Portfolio",
  description: "The portfolio of Test",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
