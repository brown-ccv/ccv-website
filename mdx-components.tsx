import React from "react"
import type { MDXComponents } from "mdx/types"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  ContentSection,
  ContentHeader,
  ContentTitle,
} from "@/components/ContentSection"
import { ButtonLink } from "@/components/button/ButtonLink"
import { StyledCard } from "@/components/card/StyledCard"
import { CardGroup } from "@/components/card/CardGroup"
import { PeopleSection } from "@/components/PeopleSection"
import { ButtonGroup } from "@/components/button/ButtonGroup"
import { CostEstimateCard } from "@/components/card/CostEstimateCard"
import { ProjectEstimationSection } from "@/components/ProjectEstimationSection"
import { LocationSection } from "@/components/LocationSection"
import { CopyableText } from "@/components/CopyableText"
import { LinkList } from "@/components/LinkList"
import { TwoColumns } from "@/components/TwoColumns"
import { Link } from "@/components/Link"

function withNotProse<T extends { className?: string }>(
  Component: React.ComponentType<T>
) {
  function WrappedComponent(props: T) {
    return <Component {...props} className={cn("not-prose", props.className)} />
  }

  WrappedComponent.displayName = `withNotProse(${Component.displayName || Component.name || "Component"})`

  return WrappedComponent
}

function MDXContentSection({
  title,
  children,
  ...props
}: {
  title: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ContentSection {...props}>
      <ContentHeader>
        <ContentTitle className="not-prose" title={title} />
      </ContentHeader>
      {children}
    </ContentSection>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="prose prose-sm max-w-none lg:prose-base">{children}</div>
    ),

    // Override default tags
    a: Link,

    // Global MDX components
    Button: (props) => (
      <ButtonLink
        variant="primary_filled"
        size="md"
        className="not-prose my-2"
        {...props}
      />
    ),
    ButtonGroup,
    CopyableText,
    StyledCard: withNotProse(StyledCard),
    CostEstimateCard: withNotProse(CostEstimateCard),
    CardGroup,
    ContentSection: (props: { title: string; children: React.ReactNode }) => (
      <MDXContentSection {...props} />
    ),
    PeopleSection: withNotProse(PeopleSection),
    LocationSection: withNotProse(LocationSection),
    ProjectEstimationSection,
    Link,
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
