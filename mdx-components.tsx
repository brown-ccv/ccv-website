import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import { ContentSection } from "@/components/ContentSection"
import { ButtonLink } from "@/components/button/ButtonLink"
import {
  FeaturedCarousel,
  FeaturedCarouselItem,
} from "@/components/FeaturedCarousel"
import { StyledCard } from "@/components/card/StyledCard"
import { CardGroup } from "@/components/card/CardGroup"
import { PeopleSection } from "@/components/PeopleSection"
import { ButtonGroup } from "@/components/button/ButtonGroup"
import { CostEstimateCard } from "@/components/card/CostEstimateCard"
import { ProjectEstimationSection } from "@/components/ProjectEstimationSection"
import { LocationSection } from "@/components/LocationSection"
import classroomCarousel from "@/content/services/classroom-carousel.json"

export const MDXCarousel = () => {
  // @ts-ignore
  const typedClassroomData =
    classroomCarousel as const as FeaturedCarouselItem[]
  return <FeaturedCarousel carouselData={typedClassroomData} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="prose max-w-none text-xl">{children}</div>
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
