import { rootUrl } from "@/app/config/root-url"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(rootUrl),
  robots: {
    index: true,
    follow: true,
  },
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
