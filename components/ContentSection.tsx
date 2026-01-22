import React from "react"
import { cn } from "@/lib/utils"
import { CCVBars } from "@/components/assets/CCVBars"

interface ContentSectionProps {
  align?: "left" | "center"
}

export function ContentSection({
  align = "center",
  className,
  ...props
}: ContentSectionProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
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
  )
}

export function ContentHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(`flex flex-col pb-6`, className)}
      data-align="inherit" // NOTE: this conditionally applies left align for header; see globals.css
      {...props}
    />
  )
}

interface ContentTitleProps {
  title: string
  bars?: boolean
  icon?: React.ReactNode
}

export function ContentTitle({
  bars = true,
  title,
  icon,
  className,
  ...props
}: ContentTitleProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {bars && <CCVBars />}
      <h2
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
  )
}

export function ContentSubHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-6 pt-4", className)} {...props} />
}
