export default function CloseButton(props: { onClick: () => void }) {
  return (
    <svg
      className="cursor-pointer p-4 box-content"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 64 64"
      onClick={props.onClick}
    >
      <g fill="#FFFFFF">
        <path d="M10.3 56.3 8 54 54 8l2.3 2.3-46 46"></path>
        <path d="m54 56.3-46-46L10.3 8l46 46-2.3 2.3"></path>
      </g>
    </svg>
  )
}
