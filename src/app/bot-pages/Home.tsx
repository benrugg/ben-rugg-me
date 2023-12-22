import FooterForBot from "./Footer"

export default function HomeForBot() {
  return (
    <>
      <p className="mb-20">Digital portfolio of Ben Rugg, expert full-stack engineer and serial entrepreneur.</p>
      <p className="uppercase tracking-wide text-lg mb-2">View my work:</p>
      <div className="flex justify-center xs:flex-row flex-col xs:space-x-12 space-x-0 xs:space-y-0 space-y-2 text-lg uppercase tracking-wide">
        <p>
          <a className="text-aqua hover:text-white" href="/companies">
            Companies & Products
          </a>
        </p>
        <p>
          <a className="text-aqua hover:text-white" href="/projects">
            Projects & Software
          </a>
        </p>
      </div>
      <FooterForBot />
    </>
  )
}
