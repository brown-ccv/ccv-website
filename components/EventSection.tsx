"use client"

import { JSX, use } from "react"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"
import CalendarMonth from "@/components/calendar/CalendarMonth"
import UpcomingEvents from "@/components/calendar/UpcomingEvents"
import { SectionHeader } from "@/components/SectionHeader"
import ButtonLink from "@/components/button/ButtonLink"
import { FaCalendarAlt } from "react-icons/fa"
import { StyledTabs } from "@/components/StyledTabs"

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

interface EventSectionProps {
  streamedDataFuture: DataProps[]
  streamedDataPast: DataProps[]
  today: string
  currentDate: Date
}

export function EventSection({
  streamedDataFuture,
  streamedDataPast,
  today,
  currentDate,
}: EventSectionProps): JSX.Element {
  const dataFuture = streamedDataFuture
  const dataPast = streamedDataPast

  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row xl:justify-between xl:gap-24">
      {/* Mobile: Show only upcoming events */}
      <div className="md:hidden">
        <UpcomingEvents events={dataFuture} />
      </div>

      {/* Desktop: Toggle and Views */}
      <div className="hidden w-full md:flex">
        <StyledTabs
          variant="neutral"
          tabs={[
            {
              value: "upcoming",
              label: "Upcoming",
              content: <UpcomingEvents events={dataFuture} />,
            },
            {
              value: "weekly",
              label: "Weekly",
              content: (
                <CalendarWeekly
                  events={dataPast.concat(dataFuture)}
                  currentDate={currentDate}
                  today={today}
                />
              ),
            },
            {
              value: "monthly",
              label: "Monthly",
              content: (
                <CalendarMonth
                  events={dataPast.concat(dataFuture)}
                  currentDate={currentDate}
                  today={today}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default EventSection
