import Image from "next/image"
import closeIcon from "@/assets/icons/close-x-icon.svg"

export default function CloseButton(props: { onClick: () => void }) {
  return <Image className="cursor-pointer p-4 box-content" src={closeIcon} alt="close" onClick={props.onClick} />
}
