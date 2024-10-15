"use client"

import { useEffect, useState } from "react"
import { getStringDate } from "@/utils"
import CalendarEvent from "@/components/calendar/CalendarEvent"
import CalendarWeekly from "@/components/calendar/CalendarWeekly"

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

const EventSection = () => {
  const [dataFuture, setDataFuture] = useState([])
  const [dataPast, setDataPast] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [view, setView] = useState("upcoming")
  const currentDate = new Date()
  const today = getStringDate(
    currentDate.getMonth() + 1,
    currentDate.getDate(),
    currentDate.getFullYear()
  )

  useEffect(() => {
    fetch(
      "https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/" +
        today +
        "/"
    )
      .then((res) => res.json())
      .then((data) => {
        setDataFuture(data)
        console.log(data)
        setLoading(false)
      })
    fetch(
      "https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/-2 months" +
        today +
        "/"
    )
      .then((res) => res.json())
      .then((data) => {
        setDataPast(data)
        console.log(data)
      })
  }, [])
  return (
    <article className="container px-2 my-6 space-y-2">
      <div>
        <h1 id="events" role="heading">
          Events
        </h1>
      </div>
      <section>
        <div className="hidden min-h-8 relative lg:block">
          <div className="toggle-btn">
            <p
              id="week"
              className={view === "weekly" ? "selected" : ""}
              onClick={() => setView("weekly")}
            >
              Weekly
            </p>
            <p
              id="month"
              className={view === "monthly" ? "selected" : ""}
              onClick={() => setView("monthly")}
            >
              Monthly
            </p>
            <p
              id="upcoming"
              className={view === "upcoming" ? "selected" : ""}
              onClick={() => setView("upcoming")}
            >
              Upcoming
            </p>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        {!dataFuture && <p>No event data</p>}
        {view === "upcoming" && (
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
        {view === "weekly" && (
          <div className="h-0 min-h-[768px] ">
            <CalendarWeekly
              today={today}
              currentDate={currentDate}
              events={dataPast.concat(dataFuture)}
            />
          </div>
        )}
      </section>

      <section className="flex justify-center">
        <a
          className="bg-secondary-blue-500 text-white p-4 rounded"
          href="https://events.brown.edu/ccv/all"
        >
          VIEW ALL EVENTS
        </a>
      </section>
    </article>
  )
}

export default EventSection
