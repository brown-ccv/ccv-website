import React, { type ReactNode } from "react"

interface ButtonProps
  extends React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  > {
  icon?: ReactNode
  variant?: string
}

export default function Button({
  icon,
  variant = "primary",
  children,
  ...delegated
}: ButtonProps) {
  let buttonStyles

  switch (variant) {
    case "primary":
      buttonStyles =
        "bg-secondary-blue-500 text-white hover:bg-secondary-blue-700"
      break
    case "secondary":
      buttonStyles = "bg-secondary-yellow-500 hover:bg-secondary-yellow-700"
      break
    case "tertiary":
      buttonStyles =
        "bg-white text-secondary-blue-700 hover:bg-neutral-100 hover:text-white"
      break
    default:
      buttonStyles =
        "bg-secondary-blue-500 text-white hover:bg-secondary-blue-700"
  }

  return (
    <button
      className={`${buttonStyles} flex items-center gap-2 px-3 py-2 w-max rounded transition-all hover:shadow-md`}
      {...delegated}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}
