import { ALL_MONTHS } from "@/components/calendar/utils"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import React from "react"

interface CalendarHeadingProps {
  date: Date
  srButtonText: string
  nextButtonFunction: Function
  prevButtonFunction: Function
  todayButtonFunction: Function
}

export const CalendarHeading: React.FC<CalendarHeadingProps> = ({
  date,
  srButtonText,
  nextButtonFunction,
  prevButtonFunction,
  todayButtonFunction,
}) => {
  return (
    <header className="mb-2 flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-2 px-6 lg:flex-none">
      <p className="text-2xl font-semibold text-blue-navbar">
        <time dateTime={date.toISOString()}>
          {`${ALL_MONTHS[date.getMonth()]} ${date.getFullYear()}`}
        </time>
      </p>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-600 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            onClick={() => prevButtonFunction()}
          >
            <span className="sr-only">Previous {srButtonText}</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden border border-gray-300 px-3.5 text-xl font-semibold text-slate-900 hover:bg-gray-50 focus:relative md:block"
            onClick={() => todayButtonFunction()}
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-600 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            onClick={() => nextButtonFunction()}
          >
            <span className="sr-only text-xl">Next {srButtonText}</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
