import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/SectionHeader"

interface ContentSectionProps {
  children: ReactNode
  title: string
  id?: string
  icon?: React.ReactNode
  subHeader?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

export const ContentSection = ({
  children,
  title,
  id,
  icon,
  subHeader,
  align = "center",
  className,
}: ContentSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "px-page w-full py-12 even:bg-neutral-50",
        align === "left" ? "flex justify-between gap-10" : "",
        className
      )}
    >
      <SectionHeader
        title={title}
        align={align}
        icon={icon}
        subHeader={subHeader}
      />
      {children}
    </section>
  )
}
