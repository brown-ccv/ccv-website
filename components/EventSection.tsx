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
  streamedDataFuture: Promise<any>
  streamedDataPast: Promise<any>
  today: string
  currentDate: Date
}

export function EventSection({
  streamedDataFuture,
  streamedDataPast,
  today,
  currentDate,
}: EventSectionProps): JSX.Element {
  const dataFuture = use(streamedDataFuture)
  const dataPast = use(streamedDataPast)

  return (
    <>
      <div className="flex flex-col gap-4 xl:flex-row xl:justify-between xl:gap-8">
        <div className="flex flex-col items-center gap-4">
          <SectionHeader
            title={"Events"}
            icon={<FaCalendarAlt />}
            className="mb-0"
          />
          <h3 className="font-serif text-xl italic mb-6">What's next at CCV</h3>
          <ButtonLink
            className="mt-0 mx-4"
            variant="primary_filled"
            size="lg"
            href="https://events.brown.edu/ccv/all"
            external={true}
          >
            View All Events
          </ButtonLink>
        </div>

        {/* Right: Toggle and Views */}
        <StyledTabs
          className="hidden md:flex"
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
    </>
  )
}

export default EventSection
