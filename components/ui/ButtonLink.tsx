import Link, { LinkProps } from "next/link"
import { ButtonVariants } from "@/components/ui/variants"
import type { VariantProps } from "class-variance-authority"
import React from "react"
import { cn } from "@/lib/utils"

type ButtonLinkProps = React.PropsWithChildren<{
  external?: boolean
  className?: string
}> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & {
    href: string
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
  external = true,
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
  ...props
}) => {
  let resolvedIconPosition = iconPosition
  if (!resolvedIconPosition && leftIcon) resolvedIconPosition = "left"
  if (!resolvedIconPosition && rightIcon) resolvedIconPosition = "right"

  const resolvedSize = iconOnly && !size ? "icon" : size
  if (external) {
    return (
      <a
        className={cn(
          ButtonVariants({
            variant,
            size: resolvedSize,
            iconPosition: resolvedIconPosition,
            className,
          })
        )}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
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
      </a>
    )
  }
  return (
    <Link
      href={href}
      className={cn(
        ButtonVariants({
          variant,
          size: resolvedSize,
          iconPosition: resolvedIconPosition,
          className,
        })
      )}
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
