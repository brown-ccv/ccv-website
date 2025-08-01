import { JSX, Key } from "react"
import { DataProps } from "@/components/EventSection"
import { EventsCard } from "@/components/card/EventsCard"
import React from "react"

interface UpcomingEventsViewProps {
  events: DataProps[]
  limit?: number
}

const UpcomingEventsView = ({
  events,
  limit = 4,
}: UpcomingEventsViewProps): JSX.Element => {
  const displayedEvents = limit ? events?.slice(0, limit) : events

  return (
    <div className="flex flex-wrap justify-end gap-6">
      {displayedEvents?.map(
        (e: JSX.IntrinsicAttributes & DataProps, i: Key | null | undefined) => (
          <React.Fragment key={i}>
            <EventsCard {...e} />
          </React.Fragment>
        )
      )}
    </div>
  )
}

export default UpcomingEventsView
