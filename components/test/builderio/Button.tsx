import React from "react"

interface ButtonProps {
  variant: "primary" | "secondary"
  label: string
}

const Button: React.FC<ButtonProps> = ({ variant, label }) => {
  const baseClasses =
    "flex flex-col flex-1 px-9 py-4 rounded-[50px] max-md:px-5"
  const variantClasses =
    variant === "primary"
      ? "bg-teal-600 text-white"
      : "border-2 border-teal-600 border-solid text-teal-600"

  return <button className={`${baseClasses} ${variantClasses}`}>{label}</button>
}

export default Button
