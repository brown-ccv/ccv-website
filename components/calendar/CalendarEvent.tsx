import React from "react"
import { DataProps } from "@/components/EventSection"
import { ClockIcon } from "@heroicons/react/20/solid"
import ButtonLink from "@/components/ui/ButtonLink"

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
    <div className="space-y-2">
      <div className="text-lg md:text-xl text-neutral-900 font-semibold">
        {normalDate}
      </div>
      <div>
        <a
          className="text-xl md:text-2xl font-bold text-blue-500 hover:underline leading-6 block w-full"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </div>
      <div className="md:text-lg flex items-center text-keppel-700">
        <ClockIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        {date_time}
      </div>
      <div className="py-2">{description_long && <p>{descriptionLong}</p>}</div>
    </div>
  )
}

export default CalendarEvent
