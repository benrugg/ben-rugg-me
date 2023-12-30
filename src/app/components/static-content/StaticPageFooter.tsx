import Link from "next/link"
import { firaCode } from "@/app/fonts/fonts"

export default function StaticPageFooter(props: { showAllLinks?: boolean }) {
  return (
    <div className={`text-center text-white ${firaCode.className} text-xs mt-20`}>
      {props.showAllLinks && (
        <>
          <Link href="/" className="text-aqua hover:text-white">
            Home
          </Link>
          <span className="mx-2">{"//"}</span>
          <Link href="/companies" className="text-aqua hover:text-white">
            Companies & Products
          </Link>
          <span className="mx-2">{"//"}</span>
          <Link href="/projects" className="text-aqua hover:text-white">
            Projects & Software
          </Link>
          <span className="mx-2">{"//"}</span>
        </>
      )}
      <Link href="/about" className="text-aqua hover:text-white">
        About
      </Link>
      <span className="mx-2">{"//"}</span>
      <Link href="/contact" className="text-aqua hover:text-white">
        Contact
      </Link>
      <span className="mx-2">{"//"}</span>
      <Link href="/full-stack-engineer" className="text-aqua hover:text-white">
        Full-Stack Engineer
      </Link>
      <span className="mx-2">{"//"}</span>
      <Link href="/madison" className="text-aqua hover:text-white">
        Madison, Wisconsin
      </Link>
    </div>
  )
}
