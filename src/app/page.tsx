"use client"

import dynamic from "next/dynamic"

const Home = dynamic(() => import("@/app/pages/Home"), { ssr: false })

export default function Page() {
  return (
    <main className="min-h-screen w-screen">
      <Home />
    </main>
  )
}
