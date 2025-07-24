import type { MDXComponents } from "mdx/types"
import { SectionHeader } from "@/components/ui/section-header"
import { Hero } from "@/components/Hero"
import { buttonVariants } from "@/components/ui/variants"
import { ButtonLink } from "@/components/ui/button-link"

export const LinkButton = ({ children, href, ...props }: any) => {
  const buttonClassName = buttonVariants({
    variant: "primary_filled",
    size: "lg",
  })

  return (
    <div className="inline-block not-prose">
      <ButtonLink href={href} className={`${buttonClassName} my-4`} {...props}>
        {children}
      </ButtonLink>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="text-xl max-w-none">{children}</div>
    ),
    // Global MDX components
    LinkButton,
    SectionHeader,
    Hero,
    ...components,
  }
}
