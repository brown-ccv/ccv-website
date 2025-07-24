// app/page.tsx
import { Hero } from "@/components/Hero";
import { HeroCard } from "@/components/HeroCard";
import { ImpactBanner } from "@/components/ImpactBanner";
import { FeaturedCarousel, FeaturedCarouselItem } from "@/components/FeaturedCarousel";
import EventSection from "@/components/EventSection";
import { getEventData } from "@/app/queries";
import { getStringDate } from "@/components/calendar/utils";
import React, { Suspense } from "react";
import Spinner from "@/components/assets/Spinner";
import { Button } from "@/components/ui/button"
import { ScrollButton } from "@/components/ui/scroll-button"
import { SectionHeader } from "@/components/ui/section-header"
import { readContentFile } from "@/lib/content-utils";
import ExternalLink from "@/components/ui/external-link";
import LayoutWithStatusBanner from "@/components/LayoutWithStatusBanner";

import { getOpenIssues } from "@/lib/get-open-issues";
import { unstable_cache } from "next/cache";

const getCachedOpenIssues = unstable_cache(
  getOpenIssues,
  ["open-issues"],
  { revalidate: 60 }
);

export default async function Home() {
  // Load featured carousel data from YAML
  const featuredCarouselRaw = await readContentFile<{ carousel: FeaturedCarouselItem[] }>("content/home/featured-carousel.yaml");
  const featuredCarouselData = featuredCarouselRaw.data.carousel;

  // Fetch GitHub issues for status banner (only on home page)
  const issues = await getCachedOpenIssues();

  try {
    const currentDate = new Date();
    const today = getStringDate(
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getFullYear()
    );
    const futureDates = getEventData(today);
    const pastDates = getEventData(`-2 months${today}`);

    return (
      <div>
        <LayoutWithStatusBanner issues={issues} />
        <Hero 
          image={"/images/hero/ccv-original.png"}
          title="Center for Computation and Visualization"
          description="Advancing computational research with scientific and computing expertise."
        >
          <Button
            variant="primary_filled"
            size="xl"
          >
            <ExternalLink href="mailto:ccv-support@brown.edu" external={true}>
              Work with Us
            </ExternalLink>
          </Button>
          <ScrollButton id="events" variant="secondary_filled" size="xl">View Events</ScrollButton>
        </Hero>
        <HeroCard />
        <ImpactBanner />
        <section className="content-wrapper pt-24 px-14 lg:px-36">
          <SectionHeader title="Featured Projects" align="center" />
          <FeaturedCarousel carouselData={featuredCarouselData} />
        </section>
        <div
          id="events"
          className="py-12 w-full bg-neutral-50"
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
    );
  } catch (err: any) {
    console.error(err);
    return (
      <div className="px-2 my-6 space-y-2">
        <p>{err.message}</p>
      </div>
    );
  }
}