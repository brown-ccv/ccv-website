"use client"

import { Link, LinkProps } from "@/components/Link"
import { ButtonVariants } from "@/components/button/variants"
import type { VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "@/utils/helper"

interface ButtonLinkProps
  extends LinkProps,
    VariantProps<typeof ButtonVariants> {
  className?: string
  isCalendarEvent?: boolean
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconOnly?: React.ReactNode
}

export function ButtonLink({
  href,
  asChild = false,
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
      {children}
    </Link>
  )
}
