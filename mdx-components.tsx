import React from "react"
import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ContentSection } from "@/components/ContentSection"
import { ButtonLink } from "@/components/button/ButtonLink"
import { StyledCard } from "@/components/card/StyledCard"
import { CardGroup } from "@/components/card/CardGroup"
import { PeopleSection } from "@/components/PeopleSection"
import { ButtonGroup } from "@/components/button/ButtonGroup"
import { CostEstimateCard } from "@/components/card/CostEstimateCard"
import { ProjectEstimationSection } from "@/components/ProjectEstimationSection"
import { LocationSection } from "@/components/LocationSection"
import { CopyableEmail } from "@/components/CopyableEmail"
import { LinkList } from "@/components/LinkList"
import { TwoColumns } from "@/components/TwoColumns"

const withNotProse = <T extends { className?: string }>(
  Component: React.ComponentType<T>
) => {
  return (props: T) => (
    <Component {...props} className={cn("not-prose", props.className)} />
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="prose prose-sm max-w-none lg:prose-base">{children}</div>
    ),

    // Global MDX components
    Button: (props) => (
      <ButtonLink
        variant="primary_filled"
        size="md"
        className="not-prose my-2"
        external
        {...props}
      />
    ),
    ButtonGroup,
    CopyableEmail,
    StyledCard: withNotProse(StyledCard),
    CostEstimateCard: withNotProse(CostEstimateCard),
    CardGroup,
    ContentSection,
    PeopleSection: withNotProse(PeopleSection),
    LocationSection: withNotProse(LocationSection),
    ProjectEstimationSection,
    LinkList: withNotProse(LinkList),
    TwoColumns,
    img: (props) => (
      <Image
        {...props}
        width={800}
        height={600}
        className="h-auto max-w-full"
      />
    ),
    ...components,
  }
}
