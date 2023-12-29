import type { Metadata } from "next"
import { rootUrl } from "@/config/root-url"
import "@/app/styles/globals.css"

export const metadata: Metadata = {
  title: "Ben Rugg // Full-Stack Engineer & Entrepreneur",
  description: "Digital portfolio of Ben Rugg // Serial entrepreneur and Full-Stack Engineer in Madison, Wisconsin.",
  metadataBase: new URL(rootUrl),
  openGraph: {
    title: "Ben Rugg // Full-Stack Engineer & Entrepreneur",
    description: "Digital portfolio of Ben Rugg // Serial entrepreneur and Full-Stack Engineer in Madison, Wisconsin.",
    url: rootUrl,
    images: [
      {
        url: `${rootUrl}/og-sharing/main-site-image.jpg`,
        width: 1600,
        height: 900,
      },
    ],
    videos: [
      {
        url: `${rootUrl}/og-sharing/site-preview.mp4`,
        width: 1120,
        height: 630,
        type: "video/mp4",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}
