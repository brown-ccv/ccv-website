import React from "react"
import CCVBars from "@/components/assets/CCVBars"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  align?: "left" | "center"
  bars?: boolean
  icon?: React.ReactNode
  subHeader?: React.ReactNode
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  title,
  align = "center",
  bars = true,
  subHeader,
  icon,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        `not-prose flex flex-col ${align === "center" ? "items-center" : "items-center lg:items-start"}`,
        className
      )}
    >
      {bars && <CCVBars />}
      <h2
        className={cn(
          "pb-2 tracking-tighter",
          icon ? "flex" : "",
          titleClassName
        )}
        aria-label={title}
      >
        {icon && (
          <span className="mr-3" aria-hidden="true">
            {icon}
          </span>
        )}
        {title}
      </h2>
      {subHeader && <div className="space-y-6 pt-4">{subHeader}</div>}
    </div>
  )
}
