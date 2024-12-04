import React from "react"
import { DataProps } from "@/components/EventSection"
import { ClockIcon } from "@heroicons/react/20/solid"

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
    <div className="bg-gray-50 p-4">
      <div className="text-neutral-900 text-sm">{normalDate}</div>
      <div>
        <a
          className="text-xl font-bold text-secondary-blue-500 no-underline leading-4"
          href={url}
          target="_blank"
        >
          {" "}
          {title}{" "}
        </a>
      </div>
      <div className="flex items-center text-primary-500 text-xs">
        <ClockIcon
          className="mr-2 h-4 w-4 text-primary-500"
          aria-hidden="true"
        />
        {date_time}
      </div>
      <div className="py-2">{description_long && <p>{descriptionLong}</p>}</div>
    </div>
  )
}

export default CalendarEvent
