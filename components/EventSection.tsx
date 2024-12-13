"use client"

import { useEffect, useState } from "react"
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

const EventSection = () => {
  const [dataFuture, setDataFuture] = useState([])
  const [dataPast, setDataPast] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [view, setView] = useState("Upcoming")
  const currentDate = new Date()
  const today = getStringDate(
    currentDate.getMonth() + 1,
    currentDate.getDate(),
    currentDate.getFullYear()
  )

  const CAL_VIEW_ARRAY = ["Weekly", "Monthly", "Upcoming"]

  useEffect(() => {
    fetch(
      `https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/${today}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setDataFuture(data)
        setLoading(false)
      })
    fetch(
      `https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/-2 months${today}/`
    )
      .then((res) => res.json())
      .then((data) => {
        setDataPast(data)
      })
  }, [today])
  return (
    <article className="container px-2 my-6 space-y-2">
      <div>
        <h1 id="events" role="heading" className="font-semibold text-4xl">
          Events
        </h1>
      </div>
      <div>
        <div className="min-h-8 relative">
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
        {isLoading && <p>Loading...</p>}
        {!dataFuture && <p>No event data</p>}
        {view === "Upcoming" && (
          <div className="flex flex-wrap justify-between">
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

      <div className="flex justify-center">
        <a
          className="bg-secondary-blue-500 text-white p-4 rounded"
          href="https://events.brown.edu/ccv/all"
        >
          VIEW ALL EVENTS
        </a>
      </div>
    </article>
  )
}

export default EventSection
