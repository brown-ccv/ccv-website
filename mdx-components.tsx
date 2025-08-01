import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import { ContentSection } from "@/components/ui/ContentSection"
import { ButtonLink } from "@/components/ui/ButtonLink"
import {
  FeaturedCarousel,
  FeaturedCarouselItem,
} from "@/components/FeaturedCarousel"
import { readContentFile } from "@/lib/content-utils"
import { CardContainer } from "@/components/card/CardContainer"
import { CardWrapper } from "@/components/card/CardWrapper"
import { PeopleSection } from "@/components/PeopleSection"
import { Button } from "@/components/ui/Button"

export const MDXButton = ({ children, href, ...props }: any) => {
  return (
    <ButtonLink
      href={href}
      variant="primary_filled"
      size="lg"
      className="my-4"
      {...props}
    >
      {children}
    </ButtonLink>
  )
}

export const ButtonGroup = ({ children, ...props }: any) => {
  return (
    <div
      className="flex flex-col sm:flex-row flex-wrap gap-4 w-full items-start not-prose"
      {...props}
    >
      {children}
    </div>
  )
}

// Server component that loads carousel data from YAML file
async function MDXCarouselData({
  carouselContentPath,
}: {
  carouselContentPath: string
}) {
  const carouselRaw = await readContentFile<{
    carousel: FeaturedCarouselItem[]
  }>(carouselContentPath)
  const carouselData = carouselRaw.data.carousel
  return <FeaturedCarousel carouselData={carouselData} />
}

// Client component wrapper for MDX compatibility
export const MDXCarousel = ({
  carouselContentPath,
}: {
  carouselContentPath: string
}) => {
  return <MDXCarouselData carouselContentPath={carouselContentPath} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="text-xl max-w-none">{children}</div>
    ),

    // Global MDX components
    MDXButton,
    ButtonGroup,
    Button,
    ButtonLink,
    CardContainer,
    CardWrapper,
    ContentSection,
    MDXCarousel,
    PeopleSection,
    img: (props) => (
      <Image
        {...props}
        width={800}
        height={600}
        className="max-w-full h-auto"
      />
    ),
    ...components,
  }
}
