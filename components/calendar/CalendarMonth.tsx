import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid"
import React, { useState } from "react"
import { CalendarProps } from "@/components/calendar/types"
import { ALL_DAYS_OF_WEEK, ALL_MONTHS } from "@/components/calendar/utils"
import {
  addDays,
  getDay,
  addMonths,
  format,
  isToday,
  isSameMonth,
  startOfWeek,
  subMonths,
  subDays,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  isAfter,
  isBefore,
  differenceInHours,
  getYear,
  getMonth,
  getDate,
  differenceInMinutes,
  isSameDay,
} from "date-fns"
import { CalendarHeading } from "@/components/calendar/CalendarHeading"

const days = [
  { date: "2021-12-27", events: [] },
  { date: "2021-12-28", events: [] },
  { date: "2021-12-29", events: [] },
  { date: "2021-12-30", events: [] },
  { date: "2021-12-31", events: [] },
  { date: "2022-01-01", isCurrentMonth: true, events: [] },
  { date: "2022-01-02", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-03",
    isCurrentMonth: true,
    events: [
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-04", isCurrentMonth: true, events: [] },
  { date: "2022-01-05", isCurrentMonth: true, events: [] },
  { date: "2022-01-06", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-07",
    isCurrentMonth: true,
    events: [
      {
        id: 3,
        name: "Date night",
        time: "6PM",
        datetime: "2022-01-08T18:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-08", isCurrentMonth: true, events: [] },
  { date: "2022-01-09", isCurrentMonth: true, events: [] },
  { date: "2022-01-10", isCurrentMonth: true, events: [] },
  { date: "2022-01-11", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-12",
    isCurrentMonth: true,
    isToday: true,
    events: [
      {
        id: 6,
        name: "Sam's birthday party",
        time: "2PM",
        datetime: "2022-01-25T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-13", isCurrentMonth: true, events: [] },
  { date: "2022-01-14", isCurrentMonth: true, events: [] },
  { date: "2022-01-15", isCurrentMonth: true, events: [] },
  { date: "2022-01-16", isCurrentMonth: true, events: [] },
  { date: "2022-01-17", isCurrentMonth: true, events: [] },
  { date: "2022-01-18", isCurrentMonth: true, events: [] },
  { date: "2022-01-19", isCurrentMonth: true, events: [] },
  { date: "2022-01-20", isCurrentMonth: true, events: [] },
  { date: "2022-01-21", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-22",
    isCurrentMonth: true,
    isSelected: true,
    events: [
      {
        id: 4,
        name: "Maple syrup museum",
        time: "3PM",
        datetime: "2022-01-22T15:00",
        href: "#",
      },
      {
        id: 5,
        name: "Hockey game",
        time: "7PM",
        datetime: "2022-01-22T19:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-23", isCurrentMonth: true, events: [] },
  { date: "2022-01-24", isCurrentMonth: true, events: [] },
  { date: "2022-01-25", isCurrentMonth: true, events: [] },
  { date: "2022-01-26", isCurrentMonth: true, events: [] },
  { date: "2022-01-27", isCurrentMonth: true, events: [] },
  { date: "2022-01-28", isCurrentMonth: true, events: [] },
  { date: "2022-01-29", isCurrentMonth: true, events: [] },
  { date: "2022-01-30", isCurrentMonth: true, events: [] },
  { date: "2022-01-31", isCurrentMonth: true, events: [] },
  { date: "2022-02-01", events: [] },
  { date: "2022-02-02", events: [] },
  { date: "2022-02-03", events: [] },
  {
    date: "2022-02-04",
    events: [
      {
        id: 7,
        name: "Cinema with friends",
        time: "9PM",
        datetime: "2022-02-04T21:00",
        href: "#",
      },
    ],
  },
  { date: "2022-02-05", events: [] },
  { date: "2022-02-06", events: [] },
]
const selectedDay = days.find((day) => day.isSelected)

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

const CalendarMonth: React.FC<CalendarProps> = ({
  events,
  currentDate,
  today,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())

  // help from https://l-u-k-e.medium.com/lets-build-a-full-page-calendar-with-react-fb6f99412e6a
  function createDaysForPreviousMonth() {
    const visibleNumberOfDaysFromPreviousMonth = getDay(
      subDays(startOfMonth(activeDate), getDay(subDays(activeDate, 1)))
    )
    const previousMonthLastMondayDayOfMonth = subDays(
      startOfMonth(activeDate),
      visibleNumberOfDaysFromPreviousMonth
    )

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
      return {
        dateString: addDays(
          previousMonthLastMondayDayOfMonth,
          index
        ).toISOString(),
        dayOfMonth: getDate(addDays(previousMonthLastMondayDayOfMonth, index)),
        isCurrentMonth: false,
        isPreviousMonth: true,
      }
    })
  }

  function createDaysforNextMonth() {
    const lastDayOfTheMonthWeekday = getDay(endOfMonth(activeDate))
    const nextMonth = startOfMonth(addMonths(activeDate, 1))
    const visibleNumberOfDaysFromNextMonth = 7 - lastDayOfTheMonthWeekday

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        dateString: addDays(nextMonth, index).toISOString(),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
        isNextMonth: true,
      }
    })
  }

  function createDaysForCurrentMonth() {
    return [...Array(getDaysInMonth(activeDate))].map((_, index) => {
      const currentDay = addDays(startOfMonth(activeDate), index)
      return {
        date: currentDay,
        dateString: currentDay.toISOString(),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
        isToday: isToday(currentDay),
      }
    })
  }

  const generateEventsForCurrentDay = (day: Date) => {
    let sameDayEvents = events.filter((event) => isSameDay(event.date_utc, day))
    // Set to get unique objects
    sameDayEvents = new Set(sameDayEvents.map(JSON.stringify))
    const dayEvents = Array.from(sameDayEvents).map(JSON.parse)

    const formattedEvents = dayEvents.map((event, i) => {
      return (
        <li key={self.crypto.randomUUID()}>
          <a href={event.url} className="group flex">
            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
              {event.title}
            </p>
            <time
              dateTime={event.date_utc}
              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
            >
              {event.date_time}
            </time>
          </a>
        </li>
      )
    })
    return <>{formattedEvents}</>
  }

  const generateDatesForCurrentMonth = (activeDate: Date) => {
    const previousMonthDates = createDaysForPreviousMonth()
    const currentMonthDates = createDaysForCurrentMonth()
    const nextMonthDates = createDaysforNextMonth()
    const combinedDates = [
      ...previousMonthDates,
      ...currentMonthDates,
      ...nextMonthDates,
    ]
    const startDate = startOfMonth(activeDate)
    const month = combinedDates.map((day, i) => {
      return (
        <div
          key={day.dateString}
          className={classNames(
            day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
            "relative px-3 py-2"
          )}
        >
          <time
            dateTime={day.dateString}
            className={
              day.isToday
                ? "flex h-6 w-6 items-center justify-center rounded-full bg-secondary-yellow-50 font-semibold"
                : undefined
            }
          >
            {day.dayOfMonth}
          </time>
          <ol className="mt-2">{generateEventsForCurrentDay(day.date)}</ol>
        </div>
      )
    })

    return <>{month}</>
  }

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <CalendarHeading
        date={activeDate}
        srButtonText={"month"}
        nextButtonFunction={() => setActiveDate(addMonths(activeDate, 1))}
        prevButtonFunction={() => setActiveDate(subMonths(activeDate, 1))}
        todayButtonFunction={() => setActiveDate(currentDate)}
      />
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {generateDatesForCurrentMonth(activeDate)}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-indigo-600",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900",
                    "ml-auto"
                  )}
                >
                  {day.date && day.date.split("-").pop().replace(/^0/, "")}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedDay && selectedDay.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <ClockIcon
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default CalendarMonth
