"use client"

import { JSX, use, useState } from "react"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"
import CalendarMonth from "@/components/calendar/CalendarMonth"
import UpcomingEvents from "@/components/calendar/UpcomingEvents"
import { Card, CardContent } from "@/components/ui/Card"
import { FaCalendarAlt } from "react-icons/fa"
import ButtonLink from "@/components/ui/ButtonLink"
import { SectionHeader } from "@/components/ui/SectionHeader"
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

const EventCard = () => {
  return (
    <Card className="w-fit">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <SectionHeader
            title="Events"
            align="center"
            bars={true}
            icon={<FaCalendarAlt />}
            className="mb-2"
          />
          <h3 className="font-serif italic text-black text-xl mb-6">
            What's next at CCV
          </h3>
          <div className="flex justify-center">
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
        </div>
      </CardContent>
    </Card>
  )
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
    <ContentSection>
      {/* Small Screen Layout (Mobile/Tablet) */}
      <div className="xl:hidden">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <EventCard />
          </div>
          <UpcomingEvents events={dataFuture} />
        </div>
      </div>

      {/* Large Screen Layout (Desktop) */}
      <div className="hidden xl:flex xl:gap-6">
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
    </ContentSection>
  )
}

export default EventSection
