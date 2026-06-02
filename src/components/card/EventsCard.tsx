import React from "react"

import sanitizeHtml from "sanitize-html"

import { StyledCard } from "@/components/card/StyledCard"
import { EventDataProps } from "@/components/EventSection"
import Icon from "@/components/ui/RenderIcon"
import { Link } from "@/components/Link"

export function EventsCard({
  date_time,
  title,
  url,
  date,
  date_utc,
  is_all_day,
  is_canceled,
  description_long,
}: EventDataProps) {
  const descriptionLong = description_long
    ? sanitizeHtml(description_long, {
        allowedTags: [],
        allowedAttributes: {},
      })
    : ""
  const dateTime = new Date(date_utc.replace(/-/g, "/"))
  const normalDate =
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dateTime) +
    ", " +
    date
  return (
    <StyledCard
      title={title}
      size="sm"
      className={is_canceled == 1 ? "opacity-60" : ""}
    >
      <div className="space-y-2">
        <p className="font-semibold text-slate-900">{normalDate}</p>
        <div className="flex items-center gap-2 text-keppel-800">
          <Icon iconName="FaClock" />
          {is_all_day ? "All Day" : date_time}
        </div>
        <Link
          className="flex gap-2 font-bold leading-6 text-blue-500 hover:underline"
          href={url}
        >
          View Event <Icon iconName="FaExternalLinkAlt" size={16} />
        </Link>
        {description_long && (
          <p className="line-clamp-[8]"> {descriptionLong} </p>
        )}
      </div>
    </StyledCard>
  )
}
