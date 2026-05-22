"use client"

import type { DataProps } from "@/components/EventSection"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { format } from "date-fns"
import { ButtonLink } from "@/components/button/ButtonLink"
import { ArrowTopRightOnSquareIcon, ClockIcon } from "@heroicons/react/20/solid"
import React from "react"

interface PopoverEventProps {
  event: DataProps
  includeTime?: boolean
  className?: string
}

export function PopoverEvent({
  event,
  className,
  includeTime = false,
}: PopoverEventProps) {
  return (
    <Popover>
      <PopoverTrigger className={className}>
        <p className="line-clamp-2 font-semibold text-blue-navbar">
          {event.title}
        </p>
        {includeTime && (
          <time
            dateTime={event.date_utc}
            className="flex items-center text-keppel-800"
          >
            <ClockIcon
              className="mr-1 h-4 w-4 flex-shrink-0"
              aria-hidden="true"
            />
            {event.is_all_day ? "All Day" : event.date_time}
          </time>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1.5 bg-neutral-50">
        <p className="font-semibold">
          {format(new Date(event.date_utc), "MMMM d, yyyy")}
        </p>
        <ButtonLink
          href={event.url}
          className="group flex gap-1 text-blue-500"
          isCalendarEvent={true}
        >
          <p className="font-semibold group-hover:underline">{event.title}</p>
          <ArrowTopRightOnSquareIcon
            className="mr-2 h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          />
        </ButtonLink>

        <time
          dateTime={event.date_utc}
          className="flex items-center text-keppel-700"
        >
          <ClockIcon
            className="mr-1 h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          />
          {event.is_all_day ? "All Day" : event.date_time}
        </time>
      </PopoverContent>
    </Popover>
  )
}
