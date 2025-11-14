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
        "px-page w-full space-y-4 py-12 even:bg-neutral-50",
        align === "left"
          ? "flex flex-col gap-24 lg:flex-row lg:justify-between lg:space-y-0"
          : "",
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
