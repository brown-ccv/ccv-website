"use client"

import React, { useEffect, useRef, useState } from "react"
import { ALL_DAYS_OF_WEEK } from "@/components/calendar/utils"
import {
  format,
  startOfWeek,
  addDays,
  differenceInHours,
  isSameMonth,
  isSameDay,
  subDays,
  isBefore,
  isAfter,
  getDay,
  differenceInMinutes,
  getDate,
  getMonth,
  getYear,
} from "date-fns"

import { CalendarProps } from "@/components/calendar/types"
import { CalendarHeading } from "@/components/calendar/CalendarHeading"
import { ClockIcon } from "@heroicons/react/20/solid"
import ButtonLink from "@/components/button/ButtonLink"

export interface weekProps {
  id: string
  num: number
}

const CalendarWeekly: React.FC<CalendarProps> = ({
  events,
  currentDate,
  today,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const containerNav = useRef<HTMLDivElement>(null)
  const containerOffset = useRef<HTMLDivElement>(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())
  // Tailwind cannot handle template literals within their styles, so I am creating an array that I will then use
  // when mapping over the vertical columns later
  const CAL_STYLE_ARRAY = [
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
    "col-start-8",
  ]

  const TIMES_ARRAY = Array.from(Array(24), (_, i) => ({
    key: Math.random(),
    time: `${((i + 11) % 12) + 1}${i <= 11 ? "AM" : "PM"}`,
  }))
  const DAY_COLUMN_ARRAY = Array.from(Array(8), (_, i) => ({
    key: Math.random(),
    day: i,
  }))

  const todayRow = getDay(today) + 1

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60

    container.current!.scrollTop =
      ((container.current!.scrollHeight -
        containerNav.current!.offsetHeight -
        containerOffset.current!.offsetHeight) *
        currentMinute) /
      1440
  }, [])

  const generateDatesForCurrentWeek = (
    date: Date,
    selectedDate: Date,
    activeDate: Date
  ) => {
    let thisDate = date
    const startDate = startOfWeek(thisDate)
    const week = ALL_DAYS_OF_WEEK.map((day, i) => {
      thisDate = addDays(startDate, i)
      const cloneDate = thisDate

      return (
        <div
          key={day}
          className={`flex items-center justify-center py-3 lg:py-4 xl:w-32 ${
            isSameMonth(thisDate, activeDate) ? "" : "inactiveDay"
          } ${isSameDay(thisDate, selectedDate) ? "selectedDay" : ""} ${isSameDay(thisDate, currentDate) ? "today bg-sunglow-50" : "bg-white"}`}
          onClick={() => {
            setSelectedDate(cloneDate)
          }}
        >
          <span className="text-center text-lg font-semibold text-slate-900">
            {day}
            <span className="mx-2 items-center justify-center">
              {format(thisDate, "d")}
            </span>
          </span>
        </div>
      )
    })

    return <>{week}</>
  }

  const generateEventsForCurrentWeek = (activeDate: Date) => {
    let thisDate = activeDate
    const startDate = startOfWeek(thisDate)
    const weekEvents = events.filter(
      (event) =>
        isAfter(event.date_utc, startDate) &&
        isBefore(event.date_utc, addDays(startDate, 7))
    )

    const formattedWeekEvents = weekEvents.map((event, i) => {
      thisDate = addDays(startDate, i)
      const lengthOfTime = differenceInHours(event.date2_utc, event.date_utc)
      const dayOfWeek = getDay(addDays(event.date_iso, 1))
      const yearEvent = getYear(event.date_utc)
      const monthEvent = getMonth(event.date_utc)
      const dateEvent = getDate(event.date_utc)
      const durationIntoDay = differenceInMinutes(
        event.date_iso,
        new Date(yearEvent, monthEvent, dateEvent)
      )

      const calColor = "bg-sunglow-300 hover:bg-sunglow-200"

      return (
        <li
          key={self.crypto.randomUUID()}
          className={`relative mt-px col-start-${dayOfWeek} sm:flex`}
          style={{
            gridRow: `${durationIntoDay / 5 + 2} / span ${lengthOfTime * 12}`,
          }}
        >
          <ButtonLink
            href={event.url}
            external={true}
            className={`${calColor} group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 md:text-sm lg:text-md`}
            isCalendarEvent={true}
          >
            <p className="font-semibold text-blue-500">{event.title}</p>
            <p className="weekly-datetime flex items-center py-2 text-keppel-700">
              <ClockIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <time dateTime={event.date_utc}>{event.date_time}</time>
            </p>
          </ButtonLink>
        </li>
      )
    })
    return <>{formattedWeekEvents}</>
  }

  return (
    <div className="flex h-full w-full flex-col">
      <CalendarHeading
        date={activeDate}
        srButtonText={"week"}
        nextButtonFunction={() => setActiveDate(addDays(activeDate, 7))}
        prevButtonFunction={() => setActiveDate(subDays(activeDate, 7))}
        todayButtonFunction={() => setActiveDate(currentDate)}
      />

      <div
        ref={container}
        className="isolate flex max-h-screen flex-auto flex-col overflow-auto border-t-2 border-white bg-white shadow ring-1 ring-black ring-opacity-5"
      >
        <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="bg-gray sticky top-0 z-30 flex-none border-white bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-white text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14 bg-white" />
              {generateDatesForCurrentWeek(
                activeDate,
                selectedDate,
                activeDate
              )}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="bg-gray sticky left-0 z-10 w-14 flex-none ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {TIMES_ARRAY.map(({ key, time }) => (
                  <React.Fragment key={key}>
                    <div>
                      <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {time}
                      </div>
                    </div>
                    <div />
                  </React.Fragment>
                ))}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                {DAY_COLUMN_ARRAY.map(({ day, key }) => (
                  <div
                    key={key}
                    className={`row-span-full ${CAL_STYLE_ARRAY[day]} ${day === 7 ? "w-8" : ""} ${day === todayRow && isSameDay(activeDate, currentDate) ? "bg-sunglow-100 bg-opacity-30" : ""}`}
                  />
                ))}
              </div>

              {/* Events */}
              {/* Note on (style):
              N / corresponds to the start row of the event -- there are 288 rows (15 min blocks)
              74th row is 6am Wednesday 92nd row is 7:30am Wednesday (18 rows apart), so 30 min is 6 units
               / span N corresponds to the height of the event -- every
              6 units is 30 min
              */}

              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {generateEventsForCurrentWeek(activeDate)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CalendarWeekly
