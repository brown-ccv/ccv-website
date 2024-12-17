"use client"

import { use, useEffect, useState } from "react"
import { getStringDate } from "@/components/calendar/utils"
import CalendarEvent from "@/components/calendar/CalendarEvent"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"
import CalendarMonth from "@/components/calendar/CalendarMonth"

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
  streamedDataFuture: Array<DataProps>
  streamedDataPast: Array<DataProps>
  today: Date
  currentDate: string
}

const EventSection = ({
  streamedDataFuture,
  streamedDataPast,
  today,
  currentDate,
}): EventSectionProps => {
  const dataFuture = use(streamedDataFuture)
  const dataPast = use(streamedDataPast)
  const [view, setView] = useState("Upcoming")
  const CAL_VIEW_ARRAY = ["Weekly", "Monthly", "Upcoming"]

  return (
    <div>
      <div className="hidden min-h-8 relative lg:block">
        <div className="toggle-btn">
          {CAL_VIEW_ARRAY.map((item) => {
            return (
              <p
                id={item}
                key={item}
                className={classNames(
                  view === item ? "selected" : "",
                  item === "Weekly" && "hidden lg:inline-block",
                  item !== "Weekly" && "inline-block",
                  "m-0 rounded-sm py-2 px-3"
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
      {!dataFuture && <p>No event data</p>}
      {view === "Upcoming" && (
        <div className="flex flex-wrap justify-between gap-4">
          {dataFuture &&
            dataFuture.slice(0, 4).map((e: DataProps, i) => {
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
        <div className="h-0 min-h-[768px] ">
          <CalendarWeekly
            today={today}
            currentDate={currentDate}
            events={dataPast.concat(dataFuture)}
          />
        </div>
      )}
      {view === "Monthly" && (
        <div>
          <CalendarMonth
            today={today}
            currentDate={currentDate}
            events={dataPast.concat(dataFuture)}
          />
        </div>
      )}
    </div>
  )
}

export default EventSection
