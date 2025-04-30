// app/page.tsx
import { Hero } from "@/components/Hero";
import { HeroCard } from "@/components/HeroCard";
import { ImpactBanner } from "@/components/ImpactBanner";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import EventSection from "@/components/EventSection";
import { getEventData } from "@/app/queries";
import { getStringDate } from "@/components/calendar/utils";
import React, { Suspense } from "react";
import Spinner from "@/components/assets/Spinner";
import { TextAnimate } from "@/components/magicui/text-animate"
import { Button } from "@/components/ui/button"
import { ScrollButton } from "@/components/ui/scroll-button"

export default async function Home() {

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
            <Hero image={"static/images/ccv-original.png"}>
                  <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                    <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                      <TextAnimate className="font-bold text-6xl md:text-8xl">
                        Center for Computation and Visualization
                      </TextAnimate>

                      <p className="text-4xl font-semibold">
                        Advancing computational research with scientific and computing
                        expertise.
                      </p>

                      <div className="flex flex-row flex-wrap gap-4 pt-8 md:pt-20">
                        <Button
                          variant="primary_filled"
                          className="h-[55px] min-w-[155px] self-start text-2xl font-semibold"
                        >
                          Work with Us
                        </Button>
                        <ScrollButton id="events" variant="secondary_filled" className="h-[55px] min-w-[155px] self-start text-2xl font-semibold">View Events</ScrollButton>
                      </div>
                    </div>
                  </div>
              </Hero>

        </div>
          <HeroCard />
          <ImpactBanner />
          <FeaturedCarousel />
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