/**
 * Unstyled Link
 */

import DefaultLink from "next/link"
import { ComponentProps } from "react"

interface LinkProps extends ComponentProps<typeof DefaultLink> {
  href: string
}

export function Link({ href, children, ...props }: LinkProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#")
  const isSystem = href.startsWith("mailto:") || href.startsWith("tel:")

  // External
  if (!isInternal) {
    return (
      <a
        href={href}
        // Open in new tab ONLY if it's a website, not email/phone
        target={isSystem ? undefined : "_blank"}
        // Security headers for new tabs
        rel={isSystem ? undefined : "noopener noreferrer"}
        {...props}
      >
        {children}
      </a>
    )
  }

  // If internal, use Next.js Link for client-side navigation
  return (
    <DefaultLink href={href} {...props}>
      {children}
    </DefaultLink>
  )
}
