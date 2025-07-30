"use client"

import { JSX, use, useState } from "react"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"
import CalendarMonth from "@/components/calendar/CalendarMonth"
import UpcomingEvents from "@/components/calendar/UpcomingEvents"
import { EventCard } from "@/components/calendar/EventCard"
import { ContentSection } from "@/components/ui/ContentSection"

export interface DataProps {
  id: number
  date: string
  date_utc: string
  date2_utc: string
  date_iso: string
  date_time: string
  title: string
  description_long: string
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

interface ToggleButtonProps {
  item: "Upcoming" | "Weekly" | "Monthly"
  view: "Upcoming" | "Weekly" | "Monthly"
  setView: (view: "Upcoming" | "Weekly" | "Monthly") => void
}

const ToggleButton = ({ item, view, setView }: ToggleButtonProps) => {
  return (
    <p
      tabIndex={0}
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
}

const CALENDAR_COMPONENTS = {
  Weekly: CalendarWeekly,
  Monthly: CalendarMonth,
} as const

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

  const renderView = () => {
    if (view === "Upcoming") {
      return <UpcomingEvents events={dataFuture} />
    }

    const CalendarComponent =
      CALENDAR_COMPONENTS[view as keyof typeof CALENDAR_COMPONENTS]
    return (
      <div className="h-0 min-h-[400px] sm:min-h-[600px] lg:min-h-[1000px]">
        <CalendarComponent
          today={today}
          currentDate={currentDate}
          events={dataPast.concat(dataFuture)}
        />
      </div>
    )
  }

  return (
    <ContentSection>
      {/* Small Screen Layout (Mobile/Tablet) */}
      <div className="xl:hidden">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <EventCard />
          </div>
          <UpcomingEvents events={dataFuture} />
        </div>
      </div>

      {/* Large Screen Layout (Desktop) */}
      <div className="hidden xl:flex xl:gap-4">
        {/* Left: Events card */}
        <div className="flex-shrink-0">
          <EventCard />
        </div>

        {/* Right: Toggle and Views */}
        <div className="flex flex-col flex-1">
          {/* Toggle Buttons */}
          <div className="relative mb-12 self-end">
            <div className="toggle-btn space-x-10 text-xl font-semibold absolute right-0 flex">
              {CAL_VIEW_ARRAY.map((item) => (
                <ToggleButton
                  key={item}
                  item={item}
                  view={view}
                  setView={setView}
                />
              ))}
            </div>
          </div>

          {/* Conditional rendering of views */}
          <div className="mt-1">{renderView()}</div>
        </div>
      </div>
    </ContentSection>
  )
}

export default EventSection
