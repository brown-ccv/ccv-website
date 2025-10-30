import { Hero } from "@/components/Hero"
import ClassroomContent from "@/content/services/classroom.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { FeaturedCarousel } from "@/components/carousel/FeaturedCarousel"
import classroomCarousel from "@/content/services/classroom-carousel.json"
import { CarouselItem } from "@/components/carousel/StyledCarousel"
import { ContentSection } from "@/components/ContentSection"

export default async function ClassroomSupport() {
  const metadata = getMDXMetadata("content/services/classroom.mdx")
  // @ts-ignore
  const typedClassroomData = classroomCarousel as const as CarouselItem[]
  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
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
