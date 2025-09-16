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
      className={`${isCentered ? "text-center" : "text-left"} ${className || ""}`}
    >
      <div
        className={`flex flex-col ${isCentered ? "items-center" : "items-start"}`}
      >
        {bars && <CCVBars />}
        <h2
          className="mt-0 flex items-center tracking-tighter lg:mt-0"
          aria-label={title}
        >
          {icon && (
            <span className="mr-3" aria-hidden="true">
              {icon}
            </span>
          )}
          {title}
        </h2>
      </div>
    </div>
  )
}
