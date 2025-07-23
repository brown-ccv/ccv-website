import { JSX, Key } from "react"
import CalendarEvent from "@/components/calendar/CalendarEvent"
import { DataProps } from "@/components/EventSection"
import { Card, CardContent } from "@/components/ui/card"

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
    <div className="flex flex-wrap justify-center gap-y-6 gap-x-6">
      {displayedEvents?.map(
        (e: JSX.IntrinsicAttributes & DataProps, i: Key | null | undefined) => (
          <div key={i} className="w-full sm:w-80 md:w-96">
            <Card className="h-full">
              <CardContent className="p-6">
                <CalendarEvent {...e} />
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  )
}

export default UpcomingEventsView
