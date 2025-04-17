"use client"

import { use, useEffect, useState } from "react"
import { getStringDate } from "@/components/calendar/utils"
import CalendarEvent from "@/components/calendar/CalendarEvent"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"
import CalendarMonth from "@/components/calendar/CalendarMonth"
import { Card, CardContent } from "@/components/ui/card"
import CCVBars from "@/components/assets/CCVBars"
import { FaCalendarAlt } from "react-icons/fa"
import { Button } from "./ui/button"

const events_url = "https://events.brown.edu/ccv/all"

export interface DataProps {
  id: string
  date_time: string
  date: string
  title: string
  date_iso: string
  date_utc: string
  date2_utc: string
  url: string
  contact_info: string
  description: string
  description_long: string
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

export function EventSection({
  streamedDataFuture,
  streamedDataPast,
  today,
  currentDate,
}: EventSectionProps): JSX.Element {
  const dataFuture = use(streamedDataFuture)
  const dataPast = use(streamedDataPast)
  const [view, setView] = useState("Upcoming")
  const CAL_VIEW_ARRAY = ["Upcoming", "Weekly", "Monthly"]

  return (
    <>
      <div className="hidden min-h-8 relative lg:block">
        <div className="toggle-btn space-x-10">
          {CAL_VIEW_ARRAY.map((item) => {
            return (
              <p
                id={item}
                key={item}
                className={classNames(
                  view === item ? "selected" : "",
                  item === "Weekly" && "hidden lg:inline-block",
                  item !== "Weekly" && "inline-block",
                  "m-0 rounded-[13px] py-2 px-3"
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
      <div className="flex flex-wrap justify-between gap-6">
        <div className="w-full md:w-1/4 min-w-[20%] flex justify-start md:justify-center">
          <Card className="w-auto max-w-xs border-none shadow-none">
            <CardContent className="py-4">
              <CCVBars />
              <h3 className="flex items-center font-semibold text-black text-[32px]">
                {<FaCalendarAlt className="mr-3" />}
                Events
              </h3>
              <p className="font-serif font-light italic text-black text-xl text-style mt-[12px]">
                What's next at CCV
              </p>
              <Button
                className="h-[55px] w-[176px] rounded-[50px] font-semibold text-[20px] mt-[34px]"
                variant="filled_primary"
              >
                <a href={events_url} target="_blank" rel="noopener noreferrer">
                  View All Events
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1">
          {!dataFuture && <p>No event data</p>}
          {view === "Upcoming" && (
            <div className="flex flex-wrap justify-between gap-4 pt-4">
              {dataFuture &&
                dataFuture.slice(0, 4).map((e: DataProps, i: number) => {
                  return (
                    <div
                      key={i}
                      className="bg-gray flex gap-6 overflow-hidden column min-w-[30ch]"
                    >
                      <CalendarEvent
                        id={e.id}
                        date_time={e.date_time}
                        title={e.title}
                        url={e.url}
                        date={e.date}
                        date_utc={e.date_utc}
                        date2_utc={e.date2_utc}
                        date_iso={e.date_iso}
                        description_long={e.description_long}
                        contact_info={e.contact_info}
                        description={e.description}
                      />
                    </div>
                  )
                })}
            </div>
          )}
          {view === "Weekly" && (
            <div className="h-0 min-h-[768px] pt-4">
              <CalendarWeekly
                today={today}
                currentDate={currentDate}
                events={dataPast.concat(dataFuture)}
              />
            </div>
          )}
          {view === "Monthly" && (
            <div className="pt-4">
              <CalendarMonth
                today={today}
                currentDate={currentDate}
                events={dataPast.concat(dataFuture)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default EventSection
