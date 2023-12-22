import Image from "next/image"
import FooterForBot from "./Footer"

export default function MadisonWisconsin() {
  return (
    <>
      <Image
        src="/images/madison/madison-easter-egg.jpg"
        width={3456}
        height={1828}
        alt="Easter Egg image of Madison, Wisconsin's Capitol Building with a map of Wisconsin superimposed on it"
      />
      <FooterForBot showAllLinks={true} />
    </>
  )
}
