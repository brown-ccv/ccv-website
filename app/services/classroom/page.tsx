import { Hero } from "@/components/Hero"
import ClassroomContent from "@/content/services/classroom.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import Carousel from "@/components/Carousel"
import classroomCarousel from "@/content/services/classroom-carousel.json"
import { FeaturedCarouselItem } from "@/components/FeaturedCarousel"

export default async function ClassroomSupport() {
  const metadata = getMDXMetadata("content/services/classroom.mdx")
  // @ts-ignore
  const typedClassroomData =
    classroomCarousel as const as FeaturedCarouselItem[]
  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <Carousel carouselData={typedClassroomData} />
      <ClassroomContent />
    </>
  )
}
