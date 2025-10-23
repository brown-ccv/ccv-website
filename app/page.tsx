// app/page.tsx
import { MainHero } from "@/components/Hero"
import { HeroCard } from "@/components/card/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import { FeaturedCarousel } from "@/components/carousel/FeaturedCarousel"
import { CarouselItem } from "@/components/carousel/Carousel"
import EventSection from "@/components/EventSection"
import { getEventData } from "@/app/queries"
import { getStringDate } from "@/components/calendar/utils"
import React, { Suspense } from "react"
import Spinner from "@/components/assets/Spinner"
import { ScrollButton } from "@/components/button/ScrollButton"
import ButtonLink from "@/components/button/ButtonLink"
import { readContentFile } from "@/lib/content-utils"
import { ContentSection } from "@/components/ContentSection"

export default async function Home() {
  // Load featured carousel data from YAML
  const featuredCarouselRaw = await readContentFile<{
    carousel: CarouselItem[]
  }>("content/home/featured-carousel.yaml")
  const featuredCarouselData = featuredCarouselRaw.data.carousel

  try {
    const currentDate = new Date()
    const today = getStringDate(
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getFullYear()
    )
    const futureDates = getEventData(today)
    const pastDates = getEventData(`-2 months${today}`)

    return (
      <>
        <MainHero
          image={"/images/hero/ccv-original.webp"}
          title="Center for Computation and Visualization"
          description="Advancing computational research with scientific and computing expertise."
        >
          <ButtonLink
            variant="primary_filled"
            size="lg"
            href="/about/help#contact-us"
            external={false}
          >
            Work with Us
          </ButtonLink>
          <ScrollButton id="events" variant="secondary_filled" size="lg">
            View Events
          </ScrollButton>
        </MainHero>
        <HeroCard />
        <ImpactBanner />
        <div>
          <ContentSection title="Featured Projects" className="px-none">
            <FeaturedCarousel carouselData={featuredCarouselData} />
          </ContentSection>
          <ContentSection title={"Events"} align={"left"} id={"events"}>
            <Suspense fallback={<Spinner />}>
              <EventSection
                streamedDataPast={pastDates}
                streamedDataFuture={futureDates}
                currentDate={currentDate}
                today={today}
              />
            </Suspense>
          </ContentSection>
        </div>
      </>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="my-6 px-2">
        <p>{err.message}</p>
      </div>
    )
  }
}
