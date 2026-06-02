import { EventDataProps } from "@/components/EventSection"

export interface CalendarProps {
  events: Array<EventDataProps>
  currentDate: Date
  today: string
}
