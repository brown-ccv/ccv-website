import EventSection from "@/components/EventSection"
import { getEventData } from "@/app/queries"
import { getStringDate } from "@/components/calendar/utils"
import SectionHeader from "@/components/SectionHeader"
import React, { Suspense } from "react"
import Spinner from "@/components/assets/Spinner"
import Carousel from "@/components/carousel-test/builderio/ProvidentComponent"

export default async function Home() {
  return (
    <div>
      <Carousel></Carousel>
      <Frontier/>
    </div>
  )
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
      <div className="px-2 my-6 space-y-2">
        <SectionHeader href={"#events"} title={"Events"} />
        <Suspense fallback={<Spinner />}>
          <EventSection
            streamedDataPast={pastDates}
            streamedDataFuture={futureDates}
            currentDate={currentDate}
            today={today}
          />
        </Suspense>
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
        <SectionHeader href={"#events"} title={"Events"} />
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
