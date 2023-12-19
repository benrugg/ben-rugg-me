import { firaCode } from "@/fonts/fonts"

export default function MainLoading() {
  return (
    <div className={`h-[100dvh] w-screen flex flex-col justify-center items-center bg-black text-white ${firaCode.className} text-sm uppercase`}>
      <div className="flex flex-col items-center justify-center fade-and-slide-in">
        <svg className="spin" width="65" height="75" viewBox="0 0 65 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.774048 19.183L32.5 0.866025L64.226 19.183V55.817L32.5 74.134L0.774048 55.817V19.183Z" stroke="#CCCCCC" strokeWidth="1.5" />
        </svg>
        <p className="mt-4 tracking-widest">Loading</p>
        <p className="mt-1 text-aqua">{"< / >"}</p>
      </div>
    </div>
  )
}
