import { Hero } from "@/components/Hero"
import ClassroomContent from "@/content/routes/services/classroom.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import { FeaturedCarousel } from "@/components/carousel/FeaturedCarousel"
import classroomCarousel from "@/content/data/classroom-carousel.json"
import { StyledCarouselItem } from "@/components/carousel/StyledCarousel"
import { ContentSection } from "@/components/ContentSection"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/services/classroom.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default async function ClassroomSupport() {
  // @ts-ignore
  const typedClassroomData = classroomCarousel as const as StyledCarouselItem[]
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description} />
      <ContentSection
        title="In-Class Tutorials"
        className="px-none bg-neutral-50"
      >
        <p className="px-page">
          CCV offers a variety of tutorials to provide students with experience
          using Brown's HPC systems. CCV staff members provide students with an
          overview of the topic and guide them through a series of hands-on
          activities. Tutorials can range from the basics of using HPC systems
          to the use of specific applications on Brown's HPC systems.
        </p>
        <FeaturedCarousel carouselData={typedClassroomData} />
      </ContentSection>

      <ClassroomContent />
    </>
  )
}
