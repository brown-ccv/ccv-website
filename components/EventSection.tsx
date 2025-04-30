// components/EventSection.tsx
"use client"

import { JSX, Key, use, useState } from "react"
import CalendarEvent from "@/components/calendar/CalendarEvent"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"
import CalendarMonth from "@/components/calendar/CalendarMonth"
import UpcomingEvents from "@/components/calendar/UpcomingEvents"
import { Card, CardContent } from "@/components/ui/card"
import CCVBars from "@/components/assets/CCVBars"
import { FaCalendarAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"

const events_url = "https://events.brown.edu/ccv/all"

export interface DataProps {
  date_utc: string
  date2_utc: string
  date_iso: string
  date_time: string
  title: string
  url: string
}

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface EventSectionProps {
  streamedDataFuture: Promise<any>
  streamedDataPast: Promise<any>
  today: string
  currentDate: Date
}

const EventCard = () => {
  return (
    <Card className="w-full border-none shadow-none my-auto lg:max-w-xs">
      <CardContent className="mb-6 mt-6">
        <CCVBars />
        <h3 className="flex items-center font-semibold text-black text-[32px]">
          <FaCalendarAlt className="mr-3" /> Events
        </h3>
        <p className="font-serif italic text-black text-xl mt-3 mb-3">
          What’s next at CCV
        </p>
        <Button className="h-[55px] font-semibold" variant="primary_filled">
          <a href={events_url} target="_blank" rel="noopener noreferrer">
            View All Events
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export function EventSection({
  streamedDataFuture,
  streamedDataPast,
  today,
  currentDate,
}: EventSectionProps): JSX.Element {
  const dataFuture = use(streamedDataFuture)
  const dataPast = use(streamedDataPast)
  const [view, setView] = useState<"Upcoming" | "Weekly" | "Monthly">(
    "Upcoming"
  )
  const CAL_VIEW_ARRAY = ["Upcoming", "Weekly", "Monthly"] as const

  return (
    <section className="content-wrapper m-0">
      {/* Small Screen Layout (Mobile/Tablet) */}
      <div className="lg:hidden">
        <div className="grid grid-cols-1 gap-6">
          <div className="justify-self-start">
            <EventCard />
          </div>
          <UpcomingEvents events={dataFuture} />
        </div>
      </div>

      {/* Large Screen Layout (Desktop) */}
      <div className="hidden lg:grid lg:grid-cols-[auto_1fr] gap-6">
        {/* Left: Events card */}
        <div className="justify-self-start">
          <EventCard />
        </div>

        {/* Right: Toggle and Views */}
        <div className="flex flex-col">
          {/* Toggle Buttons */}
          <div className="relative mb-12 self-end">
            <div className="toggle-btn space-x-10 text-xl font-semibold absolute right-0 flex">
              {CAL_VIEW_ARRAY.map((item) => {
                return (
                  <p
                    id={item}
                    key={item}
                    className={classNames(
                      view === item ? "selected" : "",
                      "inline-block m-0 rounded-[13px] py-2 px-3 cursor-pointer"
                    )}
                    role="button"
                    onClick={() => setView(item)}
                  >
                    {item}
                  </p>
                )
              })}
            </div>
          </div>

          {/* Conditional rendering of views */}
          <div className="mt-1">
            {view === "Upcoming" && <UpcomingEvents events={dataFuture} />}

            {view === "Weekly" && (
              <div className="h-0 min-h-[1000px]">
                <CalendarWeekly
                  today={today}
                  currentDate={currentDate}
                  events={dataPast.concat(dataFuture)}
                />
              </div>
            )}

            {view === "Monthly" && (
              <div className="h-0 min-h-[1000px]">
                <CalendarMonth
                  today={today}
                  currentDate={currentDate}
                  events={dataPast.concat(dataFuture)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventSection
