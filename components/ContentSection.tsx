import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/SectionHeader"

interface ContentSectionProps {
  children: ReactNode
  title?: string
  id?: string
  align?: "left" | "center"
  className?: string
  header?: boolean
}

export const ContentSection = ({
  children,
  title,
  id,
  align = "center",
  className,
  header = true,
}: ContentSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "prose prose-sm w-full p-12 lg:prose-base even:bg-neutral-50 sm:px-16 lg:px-14 xl:px-20",
        className
      )}
    >
      {header && title && <SectionHeader title={title} align={align} />}
      {children}
    </section>
  )
}
