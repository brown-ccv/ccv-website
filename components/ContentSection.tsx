import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/SectionHeader"

interface ContentSectionProps {
  children: ReactNode
  title: string
  id?: string
  align?: "left" | "center"
  className?: string
}

export const ContentSection = ({
  children,
  title,
  id,
  align = "center",
  className,
}: ContentSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "prose prose-sm lg:prose-base w-full px-6 py-16 even:bg-neutral-50 sm:px-8 md:px-12 lg:px-24 xl:px-40",
        className
      )}
    >
      {align === "center" && <SectionHeader title={title} align={align} />}
      {children}
    </section>
  )
}
