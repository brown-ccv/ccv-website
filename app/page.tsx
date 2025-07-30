// app/page.tsx
import { Hero } from "@/components/Hero"
import { HeroCard } from "@/components/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import {
  FeaturedCarousel,
  FeaturedCarouselItem,
} from "@/components/FeaturedCarousel"
import EventSection from "@/components/EventSection"
import { getEventData } from "@/app/queries"
import { getStringDate } from "@/components/calendar/utils"
import React, { Suspense } from "react"
import Spinner from "@/components/assets/Spinner"
import { ScrollButton } from "@/components/ui/scroll-button"
import { SectionHeader } from "@/components/ui/section-header"
import ButtonLink from "@/components/ui/button-link"
import { readContentFile } from "@/lib/content-utils"
import { ContentSection } from "@/components/ui/content-section"

export default async function Home() {
  // Load featured carousel data from YAML
  const featuredCarouselRaw = await readContentFile<{
    carousel: FeaturedCarouselItem[]
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
      <div>
        <Hero
          image={"/images/hero/ccv-original.png"}
          title="Center for Computation and Visualization"
          description="Advancing computational research with scientific and computing expertise."
        >
          <ButtonLink
            variant="primary_filled"
            size="xl"
            href="mailto:ccv-support@brown.edu"
            external={true}
          >
            Work with Us
          </ButtonLink>
          <ScrollButton id="events" variant="secondary_filled" size="xl">
            View Events
          </ScrollButton>
        </Hero>
        <HeroCard />
        <ImpactBanner />
        <ContentSection>
          <SectionHeader title="Featured Projects" align="center" />
          <FeaturedCarousel carouselData={featuredCarouselData} />
        </ContentSection>
        <div
          id="events"
          className="py-12 w-full bg-neutral-50 px-4 sm:px-6 lg:px-8"
        >
          <Suspense fallback={<Spinner />}>
            <EventSection
              streamedDataPast={pastDates}
              streamedDataFuture={futureDates}
              currentDate={currentDate}
              today={today}
            />
          </Suspense>
        </div>
      </div>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="px-2 my-6 space-y-2">
        <p>{err.message}</p>
      </div>
    )
  }
}
