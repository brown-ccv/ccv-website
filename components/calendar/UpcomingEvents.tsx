import { JSX, Key } from "react"
import CalendarEvent from "@/components/calendar/CalendarEvent"
import { DataProps } from "@/components/EventSection"

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayedEvents?.map(
        (e: JSX.IntrinsicAttributes & DataProps, i: Key | null | undefined) => (
          <CalendarEvent key={i} {...e} />
        )
      )}
    </div>
  )
}

export default UpcomingEventsView
