import { StyledCard } from "@/components/card/StyledCard"
import React from "react"
import { DataProps } from "@/components/EventSection"
import Icon from "@/components/ui/RenderIcon"

export const EventsCard: React.FC<DataProps> = ({
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
    <StyledCard title={title}>
      <div className="space-y-2">
        <p className="text-lg md:text-xl text-neutral-900 font-semibold">
          {normalDate}
        </p>
        <div className="md:text-lg flex items-center text-keppel-800 gap-2">
          <Icon iconName={"FaClock"} />
          {date_time}
        </div>
        <a
          className="flex gap-2 text-xl md:text-2xl font-bold text-blue-500 hover:underline leading-6  w-full"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Event <Icon iconName={"FaExternalLinkAlt"} size={16} />
        </a>
        {description_long && <p>{descriptionLong}</p>}
      </div>
    </StyledCard>
  )
}
