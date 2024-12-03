"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ClockIcon } from "@heroicons/react/20/solid"
import React, { useState } from "react"
import { CalendarProps } from "@/components/calendar/types"
import {
  addDays,
  getDay,
  addMonths,
  isToday,
  subMonths,
  subDays,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  getDate,
  isSameDay,
} from "date-fns"
import { CalendarHeading } from "@/components/calendar/CalendarHeading"

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
  function createDaysForPreviousMonth(day: Date) {
    const visibleNumberOfDaysFromPreviousMonth = getDay(startOfMonth(day))
    const previousMonthLastMondayDayOfMonth = subDays(
      startOfMonth(day),
      visibleNumberOfDaysFromPreviousMonth
    )

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
      return {
        date: addDays(previousMonthLastMondayDayOfMonth, index),
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

  function createDaysforNextMonth(day: Date) {
    const lastDayOfTheMonthWeekday = getDay(endOfMonth(day))
    const nextMonth = startOfMonth(addMonths(day, 1))
    const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: addDays(nextMonth, index),
        dateString: addDays(nextMonth, index).toISOString(),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
        isNextMonth: true,
      }
    })
  }

  function createDaysForCurrentMonth(day: Date) {
    return [...Array(getDaysInMonth(day))].map((_, index) => {
      const currentDay = addDays(startOfMonth(day), index)
      return {
        date: currentDay,
        dateString: currentDay.toISOString(),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
        isToday: isToday(currentDay),
      }
    })
  }

  const generateEventsForCurrentDay = (day: Date, isMobile = false) => {
    let sameDayEvents = events.filter((event) => isSameDay(event.date_utc, day))
    // Set to get unique objects -- the above filter results in two identical events
    sameDayEvents = new Set(sameDayEvents.map(JSON.stringify))
    const dayEvents = Array.from(sameDayEvents).map(JSON.parse)

    const formattedCalEvents = dayEvents.map((event, i) => {
      return (
        <li key={self.crypto.randomUUID()}>
          <a href={event.url} className="group flex">
            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-secondary-blue-500 group-hover:font-semibold">
              {event.title}
            </p>
            <time
              dateTime={event.date_utc}
              className="ml-3 hidden flex-none text-primary-500 group-hover:text-secondary-blue-500 group-hover:font-semibold xl:block"
            >
              {event.date_time.split("-").shift().replace(/^0/, "")}
            </time>
          </a>
        </li>
      )
    })

    const formattedContainerEvents = dayEvents.map((event, i) => {
      return (
        <li
          key={self.crypto.randomUUID()}
          className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
        >
          <div className="flex-auto">
            <a href={event.url} className="hover:text-secondary-blue-500">
              <p className="font-semibold text-gray-900">{event.title}</p>
            </a>
            <time
              dateTime={event.date_utc}
              className="mt-2 flex items-center text-primary-500"
            >
              <ClockIcon
                className="mr-2 h-5 w-5 text-primary-500"
                aria-hidden="true"
              />
              {event.date_time}
            </time>
          </div>
        </li>
      )
    })
    if (isMobile) {
      return <>{formattedContainerEvents}</>
    }
    return <>{formattedCalEvents}</>
  }

  const generateDatesForCurrentMonth = (day: Date, isMobile = false) => {
    const previousMonthDates = createDaysForPreviousMonth(day)
    const currentMonthDates = createDaysForCurrentMonth(day)
    const nextMonthDates = createDaysforNextMonth(day)
    const combinedDates = [
      ...previousMonthDates,
      ...currentMonthDates,
      ...nextMonthDates,
    ]

    const month = combinedDates.map((day, i) => {
      return (
        <div
          key={day.dateString}
          className={classNames(
            day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
            "relative px-3 py-4"
          )}
        >
          <time
            dateTime={day.dateString}
            className={
              day.isToday
                ? "flex h-6 w-6 items-center justify-center rounded-full bg-secondary-yellow-500 font-semibold"
                : undefined
            }
          >
            {day.dayOfMonth}
          </time>
          <ol className="mt-2">{generateEventsForCurrentDay(day.date)}</ol>
        </div>
      )
    })

    const mobileMonth = combinedDates.map((day, i) => {
      let sameDayEvents = events.filter((event) =>
        isSameDay(event.date_utc, day.date)
      )
      // Set to get unique objects -- the above filter results in two identical events
      sameDayEvents = new Set(sameDayEvents.map(JSON.stringify))
      const dayEvents = Array.from(sameDayEvents).map(JSON.parse)
      return (
        <button
          key={day.dateString}
          type="button"
          onClick={() => setSelectedDate(day.date)}
          className={classNames(
            day.isCurrentMonth ? "bg-white" : "bg-gray-50",
            (isSameDay(day.date, selectedDate) || day.isToday) &&
              "font-semibold",
            isSameDay(day.date, selectedDate) && "text-white",
            !isSameDay(day.date, selectedDate) &&
              day.isToday &&
              "text-secondary-blue-500 bg-secondary-yellow-500",
            !isSameDay(day.date, selectedDate) &&
              day.isCurrentMonth &&
              !day.isToday &&
              "text-gray-900",
            !isSameDay(day.date, selectedDate) &&
              !day.isCurrentMonth &&
              !isSameDay(day.date, selectedDate) &&
              "text-gray-500",
            "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
          )}
        >
          <time
            dateTime={day.date}
            className={classNames(
              isSameDay(day.date, selectedDate) &&
                "flex h-6 w-6 items-center justify-center rounded-full",
              day.isToday &&
                "flex h-6 w-6 items-center justify-center rounded-full bg-secondary-yellow-500",
              isSameDay(day.date, selectedDate) &&
                !day.isToday &&
                "bg-gray-900",
              "ml-auto"
            )}
          >
            {day.dayOfMonth}
          </time>
          <span className="sr-only">{dayEvents.length} events</span>
          {dayEvents.length > 0 && (
            <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
              {dayEvents.map((event) => (
                <span
                  key={event.id}
                  className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-secondary-blue-700"
                />
              ))}
            </span>
          )}
        </button>
      )
    })

    if (isMobile) {
      return <>{mobileMonth}</>
    }

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
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
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
        </div>
        <div className="flex bg-gray-200 text-xs/6 text-gray-700 lg:flex-auto">
          {/*Large View*/}
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {generateDatesForCurrentMonth(activeDate)}
          </div>

          {/*Mobile View*/}
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {generateDatesForCurrentMonth(activeDate, true)}
          </div>
        </div>
      </div>

      {/*Events List for Selected Day*/}
      {selectedDate && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {generateEventsForCurrentDay(selectedDate, true)}
          </ol>
        </div>
      )}
    </div>
  )
}

export default CalendarMonth
