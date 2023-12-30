import Image from "next/image"
import { useRouter } from "next/navigation"
import closeIcon from "@/assets/icons/close-x-icon.svg"

export default function CloseButton(props: { onClick?: () => void }) {
  // declare function to go home as the default onClick handler
  const router = useRouter()
  const navigateHome = () => {
    router.push("/")
  }

  // declare the onClick handler
  const onClick = props.onClick || navigateHome

  return <Image className="cursor-pointer p-4 box-content" src={closeIcon} alt="close" onClick={onClick} />
}
