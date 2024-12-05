import React from "react"
import { DataProps } from "@/components/EventSection"
import { ArrowTopRightOnSquareIcon, ClockIcon } from "@heroicons/react/20/solid"

const CalendarEvent: React.FC<DataProps> = ({
  date_time,
  title,
  url,
  date,
  date_utc,
  description_long,
}) => {
  const descriptionLong = description_long.replace(/<(.|\n)*?>/g, "")
  const dateTime = new Date(date_utc.replace(/-/g, "/"))
  const normalDate =
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dateTime) +
    ", " +
    date
  return (
    <div className="bg-gray-50 p-4 space-y-2">
      <div className="text-neutral-900 font-semibold text-sm">{normalDate}</div>
      <div>
        <a
          className="text-2xl font-bold text-secondary-blue-500 no-underline hover:underline leading-6"
          href={url}
          target="_blank"
        >
          <p>{title}</p>
        </a>
      </div>
      <div className="flex items-center text-primary-500 text-sm">
        <ClockIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        {date_time}
      </div>
      <div className="py-2">{description_long && <p>{descriptionLong}</p>}</div>
    </div>
  )
}

export default CalendarEvent
