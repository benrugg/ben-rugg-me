import { metadata as sharedMetadata } from "@/app/config/metadata"
import type { Metadata } from "next"
import "@/app/styles/globals.css"

export const metadata: Metadata = sharedMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-100">
        <main>{children}</main>
      </body>
    </html>
  )
}
