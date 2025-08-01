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
import { ScrollButton } from "@/components/ui/ScrollButton"
import ButtonLink from "@/components/ui/ButtonLink"
import { readContentFile } from "@/lib/content-utils"
import { ContentSection } from "@/components/ui/ContentSection"

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
      <>
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
        <ContentSection title="Featured Projects">
          <FeaturedCarousel carouselData={featuredCarouselData} />
        </ContentSection>
        <ContentSection title={"Events"} align={"left"}>
          <Suspense fallback={<Spinner />}>
            <EventSection
              streamedDataPast={pastDates}
              streamedDataFuture={futureDates}
              currentDate={currentDate}
              today={today}
            />
          </Suspense>
        </ContentSection>
      </>
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
