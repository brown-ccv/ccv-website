import { JSX, Key } from "react"
import { EventDataProps } from "@/components/EventSection"
import { EventsCard } from "@/components/card/EventsCard"
import React from "react"

interface UpcomingEventsViewProps {
  events: EventDataProps[]
  limit?: number
}

export function UpcomingEvents({ events, limit = 4 }: UpcomingEventsViewProps) {
  const displayedEvents = limit ? events?.slice(0, limit) : events

  return (
    <div className="flex flex-wrap justify-center gap-6 lg:justify-end">
      {displayedEvents?.map(
        (
          e: JSX.IntrinsicAttributes & EventDataProps,
          i: Key | null | undefined
        ) => (
          <React.Fragment key={i}>
            <EventsCard {...e} />
          </React.Fragment>
        )
      )}
    </div>
  )
}
