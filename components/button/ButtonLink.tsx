"use client"

import { Link, LinkProps } from "@/components/Link"
import { ButtonVariants } from "@/components/button/variants"
import type { VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "@/lib/utils"

interface ButtonLinkProps
  extends LinkProps,
    VariantProps<typeof ButtonVariants> {
  className?: string
  isCalendarEvent?: boolean
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export function ButtonLink({
  href,
  asChild = false,
  icon,
  iconPosition = "left",
  size,
  variant = "unstyled",
  children,
  className = "",
  isCalendarEvent = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={
        isCalendarEvent
          ? className
          : cn(
              ButtonVariants({
                variant,
                size,
                className,
              })
            )
      }
      {...props}
    >
      {icon ? icon : null}
      {children}
    </Link>
  )
}
