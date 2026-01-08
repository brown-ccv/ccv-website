"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { ClockIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
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
  getWeeksInMonth,
} from "date-fns"
import { CalendarHeading } from "@/components/calendar/CalendarHeading"
import { DataProps } from "@/components/EventSection"
import ButtonLink from "@/components/button/ButtonLink"
import { Button } from "@/components/button/Button"

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
        isToday: false,
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
        isToday: false,
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
    const dayEvents = sameDayEvents.filter(
      (item: DataProps, index: number, self: DataProps[]) =>
        item.id !== undefined &&
        index === self.findIndex((t) => t.id === item.id)
    )
    const validDayEvents = dayEvents.filter(
      (event) => event.date_time !== undefined
    )

    const formattedCalEvents = validDayEvents.map((event: DataProps) => {
      return (
        <li key={self.crypto.randomUUID()}>
          <Popover>
            <PopoverTrigger className="max-w-full rounded-md px-2 hover:bg-neutral-50">
              <p className="min-w-0 flex-auto truncate text-lg font-semibold text-blue-500">
                {event.title}
              </p>
            </PopoverTrigger>
            <PopoverContent className="bg-neutral-50">
              <p className="pb-2 font-semibold">{event.date}</p>
              <ButtonLink
                href={event.url}
                external={true}
                className="flex gap-1 text-blue-500"
                isCalendarEvent={true}
              >
                <p className="font-semibold hover:underline">{event.title}</p>
                <ArrowTopRightOnSquareIcon
                  className="mr-2 h-3 w-3"
                  aria-hidden="true"
                />
              </ButtonLink>

              <time
                dateTime={event.date_utc}
                className="hidden flex-none text-keppel-700 group-hover:font-semibold group-hover:text-keppel-700 xl:flex xl:items-center"
              >
                <ClockIcon
                  className="mr-1 h-4 w-4 text-keppel-700"
                  aria-hidden="true"
                />
                {event.date_time}
              </time>
            </PopoverContent>
          </Popover>
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
            <ButtonLink
              href={event.url}
              external={true}
              className="flex gap-1 text-blue-500"
              isCalendarEvent={true}
            >
              <p className="font-semibold hover:underline">{event.title}</p>
              <ArrowTopRightOnSquareIcon
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
            </ButtonLink>
            <time
              dateTime={event.date_utc}
              className="mt-2 flex items-center text-keppel-700"
            >
              <ClockIcon
                className="mr-2 h-5 w-5 text-keppel-700"
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
    const numberOfWeeks = getWeeksInMonth(day)
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
                ? "flex h-9 w-9 items-center justify-center rounded-full bg-sunglow-400 text-lg font-semibold"
                : "flex h-9 w-9 items-center justify-center text-lg"
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
      const dayEvents = sameDayEvents.filter(
        (item: DataProps, index: number, self: DataProps[]) =>
          item.id !== undefined &&
          index === self.findIndex((t) => t.id === item.id)
      )
      const validDayEvents = dayEvents.filter(
        (event) => event.date_time !== undefined
      )

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
              "bg-sunglow-400 text-blue-500",
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
            dateTime={day.dateString}
            className={classNames(
              isSameDay(day.date, selectedDate) &&
                "flex h-6 w-6 items-center justify-center rounded-full",
              day.isToday &&
                "flex h-6 w-6 items-center justify-center rounded-full bg-sunglow-400",
              isSameDay(day.date, selectedDate) &&
                !day.isToday &&
                "bg-gray-900",
              "ml-auto"
            )}
          >
            {day.dayOfMonth}
          </time>
          <span className="sr-only">{validDayEvents.length} events</span>
          {validDayEvents.length > 0 && (
            <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
              {validDayEvents.map((event) => (
                <span
                  key={event.id}
                  className="bg-700 mx-0.5 mb-1 h-1.5 w-1.5 rounded-full"
                />
              ))}
            </span>
          )}
        </button>
      )
    })

    if (isMobile) {
      return (
        <div
          className={classNames(
            numberOfWeeks === 4
              ? "lg:grid-rows-4"
              : numberOfWeeks === 5
                ? "lg:grid-rows-5"
                : "lg:grid-rows-6",
            "isolate grid w-full grid-cols-7 gap-px lg:hidden"
          )}
        >
          {mobileMonth}
        </div>
      )
    }

    return (
      <div
        className={classNames(
          numberOfWeeks === 4
            ? "lg:grid-rows-4"
            : numberOfWeeks === 5
              ? "lg:grid-rows-5"
              : "lg:grid-rows-6",
          "hidden w-full lg:grid lg:grid-cols-7 lg:gap-[3px]"
        )}
      >
        {month}
      </div>
    )
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
      <p className="mx-1 mb-2 flex text-sm lg:hidden">
        Click on a date to see a list of its events!
      </p>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-[3px] border-b border-gray-300 bg-gray-200 text-center text-lg font-semibold text-gray-700 lg:flex-none">
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
          {generateDatesForCurrentMonth(activeDate)}

          {/*Mobile View*/}

          {generateDatesForCurrentMonth(activeDate, true)}
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
