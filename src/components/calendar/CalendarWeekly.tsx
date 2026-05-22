"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  format,
  startOfWeek,
  addDays,
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
import { PopoverEvent } from "@/components/calendar/PopoverEvent"
import { CalendarProps } from "@/types/calendar-types"
import { CalendarHeading } from "@/components/calendar/CalendarHeading"
import type { DataProps } from "@/components/EventSection"

export function CalendarWeekly({ events, currentDate, today }: CalendarProps) {
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

  const ALL_DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

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

    if (!container.current || !containerNav.current || !containerOffset.current)
      return

    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440
  }, [])

  /**
   * Returns events in the active week split into all-day and timed groups.
   */
  const getWeekEvents = (date: Date) => {
    const startDate = startOfWeek(date)
    const weekEvents = (events as DataProps[]).filter((event) => {
      const eventDate = new Date(event.date_utc)
      return (
        isAfter(eventDate, startDate) &&
        isBefore(eventDate, addDays(startDate, 7))
      )
    })

    return {
      allDay: weekEvents.filter((event) => event.is_all_day),
      timed: weekEvents.filter((event) => !event.is_all_day),
    }
  }

  /**
   * Groups all-day events by weekday index so each day column can stack events.
   */
  const getAllDayByWeekday = (allDayEvents: DataProps[]) => {
    const byDay: Record<number, DataProps[]> = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    }

    allDayEvents.forEach((event) => {
      const day = getDay(new Date(event.date_iso))
      byDay[day].push(event)
    })

    return byDay
  }

  /**
   * Renders the weekday/date header row for the current week.
   */
  const generateDatesForCurrentWeek = (
    date: Date,
    selected: Date,
    active: Date
  ) => {
    let thisDate = date
    const startDate = startOfWeek(thisDate)

    return ALL_DAYS_OF_WEEK.map((day, i) => {
      thisDate = addDays(startDate, i)
      const cloneDate = thisDate

      return (
        <div
          key={day}
          className={`flex items-center justify-center py-3 lg:py-4 ${
            isSameMonth(thisDate, active) ? "" : "inactiveDay"
          } ${isSameDay(thisDate, selected) ? "selectedDay" : ""} ${
            isSameDay(thisDate, currentDate)
              ? "today bg-sunglow-50"
              : "bg-white"
          }`}
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
  }

  const { allDay, timed } = getWeekEvents(activeDate)
  const allDayByWeekday = getAllDayByWeekday(allDay)

  return (
    <div className="flex h-full w-full flex-grow flex-col">
      <CalendarHeading
        date={activeDate}
        srButtonText="week"
        nextButtonFunction={() => setActiveDate(addDays(activeDate, 7))}
        prevButtonFunction={() => setActiveDate(subDays(activeDate, 7))}
        todayButtonFunction={() => setActiveDate(currentDate)}
      />

      <div
        ref={container}
        className="isolate flex max-h-screen flex-auto flex-col overflow-auto border-t-2 border-white bg-white shadow ring-1 ring-black ring-opacity-5"
        role="grid"
        aria-label="Weekly calendar view"
      >
        <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNav}
            className="bg-gray sticky top-0 z-40 flex-none border-white bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-white text-sm leading-6 text-gray-700 sm:grid">
              <div className="col-end-1 w-14 bg-white" />
              {generateDatesForCurrentWeek(
                activeDate,
                selectedDate,
                activeDate
              )}
            </div>

            {Object.values(allDayByWeekday).some(
              (eventsForDay) => eventsForDay.length > 0
            ) && (
              <div className="hidden border-t border-gray-100 sm:block">
                <div className="ml-14 grid grid-cols-7 gap-1 px-1 py-1">
                  {ALL_DAYS_OF_WEEK.map((_, dayIndex) => (
                    <div key={dayIndex} className="min-w-0 space-y-1">
                      {allDayByWeekday[dayIndex].map((event) => (
                        <PopoverEvent
                          className="rounded-lg bg-sunglow-300 py-2 text-xs leading-tight hover:bg-sunglow-200"
                          event={event}
                          key={self.crypto.randomUUID()}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                      <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">
                        <time dateTime={time}>{time}</time>
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
                    className={`row-span-full ${CAL_STYLE_ARRAY[day]} ${
                      day === 7 ? "w-8" : ""
                    } ${
                      day === todayRow && isSameDay(activeDate, currentDate)
                        ? "bg-sunglow-100 bg-opacity-30"
                        : ""
                    }`}
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
                role="grid"
                aria-label="Calendar events"
              >
                {timed.map((event) => {
                  const eventStart = new Date(event.date_iso)
                  const eventUtc = new Date(event.date_utc)
                  const eventEnd = event.date2_utc
                    ? new Date(event.date2_utc)
                    : null

                  const spanBlocks = getEventSpanInFiveMinuteBlocks(
                    eventUtc,
                    eventEnd
                  )

                  const dayOfWeek = getDay(eventStart)
                  const yearEvent = getYear(eventUtc)
                  const monthEvent = getMonth(eventUtc)
                  const dateEvent = getDate(eventUtc)

                  const durationIntoDay = differenceInMinutes(
                    eventStart,
                    new Date(yearEvent, monthEvent, dateEvent)
                  )

                  return (
                    <li
                      key={self.crypto.randomUUID()}
                      className={`relative mt-px ${CAL_STYLE_ARRAY[dayOfWeek]} sm:flex`}
                      style={{
                        gridRow: `${Math.floor(durationIntoDay / 5) + 2} / span ${spanBlocks}`,
                      }}
                    >
                      <PopoverEvent
                        className={`absolute inset-1 flex flex-col items-center rounded-lg bg-sunglow-300 p-2 text-xs leading-tight hover:bg-sunglow-200 ${
                          spanBlocks > 6 ? "gap-2" : ""
                        }`}
                        event={event}
                        includeTime
                      />
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Converts an event duration to 5-minute grid blocks and clamps to at least one block.
 */
const getEventSpanInFiveMinuteBlocks = (
  eventStartUtc: Date,
  eventEndUtc: Date | null
): number => {
  if (!eventEndUtc) return 12

  const durationMinutes = differenceInMinutes(eventEndUtc, eventStartUtc)
  const safeDurationMinutes = Math.max(durationMinutes, 5)
  const spanBlocks = Math.ceil(safeDurationMinutes / 5)

  return Math.max(spanBlocks, 1)
}
