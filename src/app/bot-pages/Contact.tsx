import FooterForBot from "./Footer"

export default function ContactForBot() {
  return (
    <>
      <h1 className="uppercase tracking-wider text-2xl my-6 text-aqua">/Get In Touch</h1>
      <div className="flex flex-col space-y-8 mx-auto my-20">
        <div>
          <p>/LinkedIn</p>
          <p className="mt-1">
            <a className="lowercase text-aqua hover:text-white" href="https://www.linkedin.com/in/benrugg/" target="_blank">
              @benrugg
            </a>
          </p>
        </div>
        <div>
          <p>/Email</p>
          <p className="mt-1">
            <a className="lowercase text-aqua hover:text-white text-sm" href="#">
              Please view this site in a browser to see my email address
            </a>
          </p>
        </div>
      </div>
      <FooterForBot showAllLinks={true} />
    </>
  )
}
