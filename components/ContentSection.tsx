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
        "w-full py-16 px-6 sm:px-8 lg:px-24 md:px-12 xl:px-40 even:bg-neutral-50",
        className
      )}
    >
      {align === "center" && <SectionHeader title={title} align={align} />}
      {children}
    </section>
  )
}
