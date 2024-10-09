"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import React, { useEffect, useRef, useState } from "react"
import { DataProps } from "@/components/EventSection"
import { ALL_MONTHS, ALL_DAYS_OF_WEEK } from "@/utils"
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

export interface CalendarProps {
  events: Array<DataProps>
  currentDate: Date
  today: string
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
          className={`flex items-center justify-center py-3 ${
            isSameMonth(thisDate, activeDate) ? "" : "inactiveDay"
          } ${isSameDay(thisDate, selectedDate) ? "selectedDay" : ""}
          ${isSameDay(thisDate, currentDate) ? "today bg-secondary-yellow-100" : ""}`}
          onClick={() => {
            setSelectedDate(cloneDate)
          }}
        >
          <span>
            {day}
            <span className="mx-2 items-center justify-center font-semibold text-gray-900">
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

      const calColor =
        event.title === "CCV Office Hours"
          ? "bg-primary-50 hover:bg-primary-500"
          : event.title ===
              "COBRE CBC Computational Biology Walk-in Office hours"
            ? "bg-secondary-blue-50 hover:bg-secondary-blue-300"
            : "bg-secondary-yellow-50 hover:bg-secondary-yellow-100"

      return (
        <li
          className={`relative mt-px col-start-${dayOfWeek} sm:flex`}
          style={{
            gridRow: `${durationIntoDay / 5 + 3} / span ${lengthOfTime * 12}`,
          }}
        >
          <a
            href={event.url}
            className={`${calColor} group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5`}
          >
            <p className="order-1 font-semibold text-secondary-blue-700">
              {event.title}
            </p>
            <p className="weekly-datetime">
              <time dateTime={event.date_utc}>{event.date_time}</time>
            </p>
          </a>
        </li>
      )
    })
    return <>{formattedWeekEvents}</>
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-end gap-3.5 px-6 py-4">
        <h1 className="text-lg font-semibold leading-6 text-gray-900">
          <time dateTime={today}>
            {`${ALL_MONTHS[activeDate.getMonth()]} ${activeDate.getFullYear()}`}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-gray shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-white pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={() => setActiveDate(subDays(activeDate, 7))}
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-white px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              onClick={() => setActiveDate(currentDate)}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-white pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={() => setActiveDate(addDays(activeDate, 7))}
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="ml-6 h-6 w-px bg-gray-300" />
          </div>
        </div>
      </header>
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto bg-gray"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-gray shadow ring-1 ring-white ring-opacity-5 sm:pr-8"
          >
            <div className="-mr-px hidden grid-cols-7 divide-x divide-white border-r border-white text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {generateDatesForCurrentWeek(
                activeDate,
                selectedDate,
                activeDate
              )}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-gray ring-1 ring-white" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-white"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-white sm:grid sm:grid-cols-7">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={`column-${index}`}
                    className={`row-span-full col-start-${index + 1} ${
                      index === 7 ? "w-8" : ""
                    } ${index === todayRow && isSameDay(activeDate, currentDate) ? "bg-secondary-yellow-100" : ""}`}
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
