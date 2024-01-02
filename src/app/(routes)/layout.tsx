import MainWrapper from "@/app/components/MainWrapper"
import { rootUrl } from "@/app/config/root-url"
import "@/app/styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(rootUrl),
  openGraph: {
    title: "Ben Rugg // Full-Stack Engineer and Serial Entrepreneur",
    description: "Digital portfolio of Ben Rugg // Serial Entrepreneur and Full-Stack Engineer in Madison, Wisconsin.",
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
      <body className="bg-black">
        <main>
          <MainWrapper />
          {children}
        </main>
      </body>
    </html>
  )
}
