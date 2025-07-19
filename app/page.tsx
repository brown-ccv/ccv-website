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

export default async function Home() {
  // Load featured carousel data from YAML
  const featuredCarouselRaw = await readContentFile<{ carousel: FeaturedCarouselItem[] }>("app/content/home/featured-carousel.yaml");
  const featuredCarouselData = featuredCarouselRaw.data.carousel;

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
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-blue-navbar">
            <Hero 
              image={"/images/hero/ccv-original.png"}
              title="Center for Computation and Visualization"
              description="Advancing computational research with scientific and computing expertise."
              titleClassName="font-bold text-6xl md:text-8xl"
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
          </div>
          <HeroCard />
          <ImpactBanner />
          <section className="content-wrapper pt-24">
            <SectionHeader title="Featured Projects" align="center" />
          </section>
          <FeaturedCarousel carouselData={featuredCarouselData} />
        </div>
        <div
          id="events"
          className="py-12 w-full bg-gray-100"
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