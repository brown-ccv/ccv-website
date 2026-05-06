import {
  ContentHeader,
  ContentTitle,
  ContentSubHeader,
} from "@/components/ContentSection"
import { cn } from "@/lib/utils"
import React from "react"

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
    <ContentHeader
      className={cn(
        "not-prose",
        align === "center" ? "items-center" : "items-center lg:items-start",
        className
      )}
      data-align={align}
    >
      <ContentTitle
        title={title}
        bars={bars}
        icon={icon}
        className={titleClassName}
        aria-label={title}
      />
      {subHeader && <ContentSubHeader>{subHeader}</ContentSubHeader>}
    </ContentHeader>
  )
}
