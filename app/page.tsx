import Header from "@/components/header/Header"
import { HeroHome } from "@/components/HeroHome"
import { HeroCard } from "@/components/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import SectionHeader from "@/components/SectionHeader"
import NavbarAnima from "@/components/header/NavbarAnima"
import { FeaturedCarousel } from "@/components/FeaturedCarousel"
import EventSection from "@/components/EventSection"
import { getEventData } from "@/app/queries"
import { getStringDate } from "@/components/calendar/utils"
import React, { Suspense } from "react"
import Spinner from "@/components/assets/Spinner"

export default async function Home() {
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
      <div className="px-2 my-6 space-y-2 w-full">
        <Header />
        <div className="relative w-full">
          <div className="flex flex-col space-y-24">
            <HeroHome />
            <HeroCard />
            <ImpactBanner />
            <FeaturedCarousel />
          </div>
        </div>
        <div id="events" className="mt-20 w-full">
          <SectionHeader href={"#events"} title={"Events"} />

          <Suspense fallback={<Spinner />}>
            <EventSection
              streamedDataPast={pastDates}
              streamedDataFuture={futureDates}
              currentDate={currentDate}
              today={today}
            />
          </Suspense>
        </div>
        <div className="flex justify-center">
          <a
            className="bg-secondary-blue-500 text-white p-4 rounded"
            href="https://events.brown.edu/ccv/all"
          >
            VIEW ALL EVENTS
          </a>
        </div>
      </div>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="px-2 my-6 space-y-2">
        <p>{err.message}</p>
        <div className="flex justify-center">
          <a
            className="bg-secondary-blue-500 text-white p-4 rounded"
            href="https://events.brown.edu/ccv/all"
          >
            VIEW ALL EVENTS
          </a>
        </div>
      </div>
    )
  }
}
