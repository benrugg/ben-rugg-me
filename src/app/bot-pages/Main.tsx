import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { firaCode } from "@/fonts/fonts"

const HomeForBot = dynamic(() => import("./Home"), {
  ssr: false,
})

const CompaniesAndProjectsForBot = dynamic(() => import("./CompaniesAndProjects"), {
  ssr: false,
})

const AboutForBot = dynamic(() => import("./About"), {
  ssr: false,
})

const ContactForBot = dynamic(() => import("./Contact"), {
  ssr: false,
})

const FullStackEngineerForBot = dynamic(() => import("./FullStackEngineer"), {
  ssr: false,
})

const MadisonWisconsin = dynamic(() => import("./MadisonWisconsin"), {
  ssr: false,
})

export default function MainForBot() {
  const pathname = usePathname()

  return (
    <div className={`text-center text-white ${firaCode.className} p-6`}>
      <h1 className="uppercase tracking-widest text-3xl mt-6 mb-10">Ben Rugg</h1>
      {pathname === "/" && <HomeForBot />}
      {pathname === "/companies" && <CompaniesAndProjectsForBot screen="companies" />}
      {pathname === "/projects" && <CompaniesAndProjectsForBot screen="projects" />}
      {pathname === "/about" && <AboutForBot />}
      {pathname === "/contact" && <ContactForBot />}
      {pathname === "/full-stack-engineer" && <FullStackEngineerForBot />}
      {pathname === "/madison" && <MadisonWisconsin />}
    </div>
  )
}
