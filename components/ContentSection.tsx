import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/SectionHeader"
import CCVBars from "@/components/assets/CCVBars"

interface ContentTitleProps {
  title: string
  bars?: boolean
  icon?: React.ReactNode
}

const ContentTitle = React.forwardRef<
  HTMLDivElement,
  ContentTitleProps & React.HTMLAttributes<HTMLDivElement>
>(({ bars = true, title, icon, className, ...props }, ref) => (
  <>
    {bars && <CCVBars />}
    <h2
      ref={ref} // Make sure to forward the ref
      className={cn("pb-2 tracking-tighter", icon ? "flex" : "", className)}
      aria-label={title}
      {...props}
    >
      {icon && (
        <span className="mr-3" aria-hidden="true">
          {icon}
        </span>
      )}
      {title}
    </h2>
  </>
))
ContentTitle.displayName = "ContentTitle"

const ContentHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      `getHeaderAlignFromParent flex flex-col pb-6`, // NOTE: this conditionally applies left align for header; see globals.css
      className
    )}
    {...props}
  />
))
ContentHeader.displayName = "ContentHeader"

const ContentSubHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("space-y-6 pt-4", className)} {...props} />
))
ContentSubHeader.displayName = "ContentSubHeader"

interface ContentSectionProps {
  align?: "left" | "center"
}

const ContentSection = React.forwardRef<
  HTMLDivElement,
  ContentSectionProps & React.HTMLAttributes<HTMLDivElement>
>(({ align = "center", className, ...props }, ref) => (
  <section
    className={cn(
      "w-full space-y-4 px-12 py-12 even:bg-neutral-50 sm:px-16 lg:px-14 xl:px-20",
      align === "left"
        ? "flex flex-col lg:flex-row lg:justify-between lg:gap-24 lg:space-y-0"
        : "",
      className
    )}
    data-align={align}
    {...props}
  />
))

ContentSection.displayName = "ContentSection"

export { ContentSection, ContentTitle, ContentSubHeader, ContentHeader }
