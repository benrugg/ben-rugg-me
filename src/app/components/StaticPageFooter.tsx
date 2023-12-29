import { firaCode } from "@/fonts/fonts"

export default function StaticPageFooter(props: { showAllLinks?: boolean }) {
  return (
    <div className={`text-center text-white ${firaCode.className} text-xs mt-20`}>
      {props.showAllLinks && (
        <>
          <a href="/" className="text-aqua hover:text-white">
            Home
          </a>
          <span className="mx-2">{"//"}</span>
          <a href="/companies" className="text-aqua hover:text-white">
            Companies & Products
          </a>
          <span className="mx-2">{"//"}</span>
          <a href="/projects" className="text-aqua hover:text-white">
            Projects & Software
          </a>
          <span className="mx-2">{"//"}</span>
        </>
      )}
      <a href="/about" className="text-aqua hover:text-white">
        About
      </a>
      <span className="mx-2">{"//"}</span>
      <a href="/contact" className="text-aqua hover:text-white">
        Contact
      </a>
      <span className="mx-2">{"//"}</span>
      <a href="/full-stack-engineer" className="text-aqua hover:text-white">
        Full-Stack Engineer
      </a>
      <span className="mx-2">{"//"}</span>
      <a href="/madison" className="text-aqua hover:text-white">
        Madison, Wisconsin
      </a>
    </div>
  )
}
