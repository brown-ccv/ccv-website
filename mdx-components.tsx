import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import { ContentSection } from "@/components/ContentSection"
import { ButtonLink } from "@/components/button/ButtonLink"
import {
  FeaturedCarousel,
  FeaturedCarouselItem,
} from "@/components/FeaturedCarousel"
import { readContentFile } from "@/lib/content-utils"
import { StyledCard } from "@/components/card/StyledCard"
import { CardGroup } from "@/components/card/CardGroup"
import { PeopleSection } from "@/components/PeopleSection"
import { ButtonGroup } from "@/components/button/ButtonGroup"
import { CostEstimateCard } from "@/components/card/CostEstimateCard"
import { ProjectEstimationSection } from "@/components/ProjectEstimationSection"
import { LocationSection } from "@/components/LocationSection"
import { CopyableEmail } from "@/components/CopyableEmail"

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
      <div className="prose prose-sm lg:prose-base max-w-none">{children}</div>
    ),

    // Global MDX components
    Button: (props) => (
      <ButtonLink
        variant="primary_filled"
        size="lg"
        className="my-4"
        external
        {...props}
      />
    ),
    ButtonGroup,
    CopyableEmail,
    StyledCard,
    CostEstimateCard,
    CardGroup,
    ContentSection,
    MDXCarousel,
    PeopleSection,
    LocationSection,
    ProjectEstimationSection,
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
