"use client"

import { Link, LinkProps } from "@/components/Link"
import { ButtonVariants } from "@/components/button/variants"
import type { VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "@/lib/utils"

interface ButtonLinkProps extends LinkProps {
  className?: string
  isCalendarEvent?: boolean
}
export interface ExternalProps
  extends ButtonLinkProps,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  iconOnly?: React.ReactNode
}

export const ButtonLink: React.FC<ExternalProps> = ({
  href,
  asChild = false,
  leftIcon,
  rightIcon,
  iconOnly,
  iconPosition,
  size,
  variant = "unstyled",
  children,
  className = "",
  isCalendarEvent = false,
  ...props
}) => {
  let resolvedIconPosition = iconPosition
  if (!resolvedIconPosition && leftIcon) resolvedIconPosition = "left"
  if (!resolvedIconPosition && rightIcon) resolvedIconPosition = "right"

  const resolvedSize = iconOnly && !size ? "icon" : size

  return (
    <Link
      href={href}
      className={
        isCalendarEvent
          ? className
          : cn(
              ButtonVariants({
                variant,
                size: resolvedSize,
                iconPosition: resolvedIconPosition,
                className,
              })
            )
      }
      {...props}
    >
      {iconOnly ? (
        <>
          {iconOnly}
          {children && <span className="sr-only">{children}</span>}
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </Link>
  )
}

export default ButtonLink
