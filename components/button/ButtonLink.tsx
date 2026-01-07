"use client"

import Link, { LinkProps } from "next/link"
import { ButtonVariants } from "@/components/button/variants"
import type { VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "@/lib/utils"

type ButtonLinkProps = React.PropsWithChildren<{
  external?: boolean
  className?: string
  isCalendarEvent?: boolean
}> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & {
    href: string
  }

export interface ExternalProps
  extends ButtonLinkProps,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  iconAlign?: 'left' | 'right'
}

export const ButtonLink: React.FC<ExternalProps> = ({
  external = true,
  href,
  asChild = false,
  icon,
  iconAlign,
  size,
  variant = "unstyled",
  children,
  className = "",
  isCalendarEvent = false,
  ...props
}) => {
  const resolvedSize = icon && !size ? "icon" : size

  if (external) {
    return (
      <a
        className={
          isCalendarEvent
            ? className
            : cn(
                ButtonVariants({
                  variant,
                  size: resolvedSize,
                  className,
                })
              )
        }
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {icon ? (
          <>
            {icon}
            {children && <span className="sr-only">{children}</span>}
          </>
        ) : (
          <>
            {children}
          </>
        )}
      </a>
    )
  }
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

export default ButtonLink
