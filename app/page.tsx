import Header from "@/components/header/Header"
import { HeroHome } from "@/components/HeroHome"
import { HeroCard } from "@/components/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import Navbar from "@/components/header/Navbar"
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
      <div className="w-full">
        <Header />
        <Navbar />
        <div className="relative w-full flex flex-col">
          <HeroHome />
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
