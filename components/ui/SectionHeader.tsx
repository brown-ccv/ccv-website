import React from "react"
import CCVBars from "@/components/assets/CCVBars"

interface SectionHeaderProps {
  title: string
  align?: "left" | "center"
  bars?: boolean
  icon?: React.ReactNode
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  align = "center",
  bars = true,
  icon,
  className,
}) => {
  const isCentered = align === "center"

  return (
    <div
      className={`${isCentered ? "text-center mb-16" : "text-left"} ${className || ""}`}
    >
      <div
        className={`relative flex flex-col ${
          isCentered ? "items-center" : "items-start"
        }`}
      >
        {bars ? (
          <div className="pt-4">
            <CCVBars />
          </div>
        ) : null}
        <h2 className="font-semibold text-black text-4xl tracking-tighter flex items-center m-0">
          {icon && <span className="mr-3">{icon}</span>}
          {title}
        </h2>
      </div>
    </div>
  )
}
