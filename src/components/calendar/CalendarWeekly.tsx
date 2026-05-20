"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
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

import { CalendarProps } from "@/types/calendar-types"
import { CalendarHeading } from "@/components/calendar/CalendarHeading"
import { ClockIcon } from "@heroicons/react/20/solid"
import { ButtonLink } from "@/components/button/ButtonLink"

const ALL_DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

export function CalendarWeekly({ events, currentDate, today }: CalendarProps) {
  const container = useRef<HTMLDivElement>(null)
  const containerNav = useRef<HTMLDivElement>(null)
  const containerOffset = useRef<HTMLDivElement>(null)

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())

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

  const weekStart = useMemo(() => startOfWeek(activeDate), [activeDate])

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  )

  const weekEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          isAfter(event.date_utc, weekStart) &&
          isBefore(event.date_utc, addDays(weekStart, 7))
      ),
    [events, weekStart]
  )

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
            className="bg-gray sticky top-0 z-30 flex-none border-white bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-white text-sm leading-6 text-gray-700 sm:grid">
              <div className="col-end-1 w-14 bg-white" />
              {weekDays.map((date, i) => (
                <button
                  key={date.toISOString()}
                  type="button"
                  className={`flex items-center justify-center py-3 lg:py-4 ${
                    isSameMonth(date, activeDate) ? "" : "inactiveDay"
                  } ${isSameDay(date, selectedDate) ? "selectedDay" : ""} ${
                    isSameDay(date, currentDate)
                      ? "today bg-sunglow-50"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-center text-lg font-semibold text-slate-900">
                    {ALL_DAYS_OF_WEEK[i]}
                    <span className="mx-2 items-center justify-center">
                      {format(date, "d")}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-auto">
            <div className="bg-gray sticky left-0 z-10 w-14 flex-none ring-1 ring-gray-100" />

            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines + time labels */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7" />
                {Array.from({ length: 24 }, (_, i) => {
                  const time = `${((i + 11) % 12) + 1}${i <= 11 ? "AM" : "PM"}`
                  return (
                    <div
                      key={i}
                      className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600"
                    >
                      <time dateTime={time}>{time}</time>
                    </div>
                  )
                })}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 divide-x divide-gray-100 sm:grid">
                {Array.from({ length: 8 }, (_, day) => (
                  <div
                    key={day}
                    className={`row-span-full col-start-${day + 1} ${
                      day === 7 ? "w-8" : ""
                    } ${
                      day + 1 === todayRow && isSameDay(activeDate, currentDate)
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
                {weekEvents.map((event) => {
                  const lengthOfTime =
                    event.date2_utc && event.date_utc
                      ? differenceInHours(event.date2_utc, event.date_utc)
                      : 1

                  const dayOfWeek = getDay(addDays(event.date_iso, 1))
                  const yearEvent = getYear(event.date_utc)
                  const monthEvent = getMonth(event.date_utc)
                  const dateEvent = getDate(event.date_utc)
                  const durationIntoDay = differenceInMinutes(
                    event.date_iso,
                    new Date(yearEvent, monthEvent, dateEvent)
                  )

                  return (
                    <li
                      key={self.crypto.randomUUID()}
                      className={`relative mt-px sm:flex col-start-${dayOfWeek}`}
                      style={{
                        gridRow: `${durationIntoDay / 5 + 2} / span ${lengthOfTime * 12}`,
                      }}
                    >
                      <ButtonLink
                        href={event.url}
                        className="group absolute inset-1 flex flex-col gap-2 overflow-y-auto rounded-lg bg-sunglow-300 p-2 text-xs leading-tight hover:bg-sunglow-200 lg:text-base"
                        isCalendarEvent
                      >
                        <p className="font-semibold text-blue-navbar">
                          {event.title}
                        </p>
                        <p className="flex items-center gap-2 text-keppel-800">
                          <ClockIcon
                            className="hidden h-3 w-3 flex-shrink-0 lg:block"
                            aria-hidden="true"
                          />
                          {event.is_all_day ? (
                            "All Day"
                          ) : (
                            <time dateTime={String(event.date_utc)}>
                              {event.date_time}
                            </time>
                          )}
                        </p>
                      </ButtonLink>
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
