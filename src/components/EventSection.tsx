"use client"

import { JSX, useEffect, useState } from "react"
import { CalendarWeekly } from "@/components/calendar/CalendarWeekly"
import { CalendarMonth } from "@/components/calendar/CalendarMonth"
import { UpcomingEvents } from "@/components/calendar/UpcomingEvents"
import { StyledTabs } from "@/components/StyledTabs"
import { Spinner } from "@/components/assets/Spinner"
import { FaExclamationTriangle } from "react-icons/fa"

// For number values that typically would correspond as boolean, the API returns 1/0 instead of true/false.
export interface EventDataProps {
  id: number
  gid: number
  title: string
  url: string

  date: string
  date_time: string
  date_utc: string
  date_iso: string
  date_ts: number
  tz_offset: string
  timezone: string

  date2_time: string
  date2_utc: string
  date2_iso: string
  date2_ts: number
  tz2_offset: string

  is_all_day: boolean

  repeats: string | null
  repeats_until: string | null
  repeats_start: string | null
  repeats_end: string | null

  is_starred: boolean | null
  is_canceled: number
  is_online: number

  online_type: string | null
  online_url: string | null
  online_button_label: string | null
  online_instructions: string | null

  description: string | null
  description_long: string | null
  contact_info: string | null

  cost: string | null

  location: string | null
  location_title: string | null
  location_latitude: number | null
  location_longitude: number | null
  location_id: number | null

  thumbnail: string | null
  thumbnail_caption: string | null
  thumbnail_alt: string | null

  has_registration: boolean | null
  registration_owner_email: string | null
  has_wait_list: boolean | null
  registration_limit: number | null
  wait_list_limit: number | null

  rsvp_total: number | null
  rsvp_waitlist_total: number | null

  event_types: string[] | null
  event_types_audience: string[] | null
  event_types_campus: string[] | null

  tags: string[] | null
  tags_starred: string[] | null
  tags_global: string[] | null

  last_editor: string
  last_modified: number

  group: string
}

export function EventSection(): JSX.Element {
  const [futureDates, setFutureDates] = useState<EventDataProps[]>([])
  const [pastDates, setPastDates] = useState<EventDataProps[]>([])
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [today, setToday] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    /**
     * Loads past and future event data and updates component state.
     */
    async function loadEvents(): Promise<void> {
      const now = new Date()
      const todayStr = getTodayIsoDate(now)

      if (!active) return
      setCurrentDate(now)
      setToday(todayStr)
      setLoading(true)
      setError(null)

      try {
        const [past, future] = await fetchEventRanges(todayStr)
        if (!active) return
        setPastDates(past)
        setFutureDates(future)
      } catch (err) {
        if (!active) return
        console.error("Failed to load events:", err)
        setError("Unable to load events right now.")
      } finally {
        if (active) setLoading(false)
      }
    }

    loadEvents()

    return () => {
      active = false
    }
  }, [])

  // Error first so it isn't hidden by loading/data guards
  if (error) {
    return (
      <div role="alert" className="flex items-center justify-center">
        <FaExclamationTriangle
          className="mr-3 flex-shrink-0 text-red-university md:mr-2"
          aria-hidden="true"
        />
        <span>{error} If the problem persists, please contact support.</span>
      </div>
    )
  }

  if (loading || !currentDate) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  const allEvents = pastDates.concat(futureDates)

  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row xl:justify-between xl:gap-24">
      <div className="md:hidden">
        <UpcomingEvents events={futureDates} />
      </div>

      <div className="hidden w-full md:flex">
        <StyledTabs
          variant="neutral"
          tabs={[
            {
              value: "upcoming",
              label: "Upcoming",
              content: <UpcomingEvents events={futureDates} />,
            },
            {
              value: "weekly",
              label: "Weekly",
              content: (
                <CalendarWeekly
                  events={allEvents}
                  currentDate={currentDate}
                  today={today}
                />
              ),
            },
            {
              value: "monthly",
              label: "Monthly",
              content: (
                <CalendarMonth
                  events={allEvents}
                  currentDate={currentDate}
                  today={today}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

/**
 * Fetches both past and future event ranges based on today's date string.
 */
async function fetchEventRanges(
  today: string
): Promise<[EventDataProps[], EventDataProps[]]> {
  const [past, future] = await Promise.all([
    getEventData("-2 months", today), // bounded past window
    getEventData(today), // future from today
  ])
  return [past, future]
}

/**
 * Converts a date to YYYY-MM-DD using ISO format.
 */
function getTodayIsoDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

// Brown Events uses the LiveWhale API: https://support.livewhale.com/live/blurbs/api
async function getCCVData(startDate: string, endDate?: string) {
  const endPart = endDate ? `/end_date/${encodeURIComponent(endDate)}` : ""
  const url = `https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/${encodeURIComponent(startDate)}${endPart}/`
  const response = await fetch(url)
  return await response.json()
}

async function getDscovData(startDate: string, endDate?: string) {
  const description_long = true
  const group = "Data%20Science%20Institute"
  const endPart = endDate ? `/end_date/${encodeURIComponent(endDate)}` : ""
  const url = `https://events.brown.edu/live/json/events/description_long/${description_long}/group/${group}/start_date/${encodeURIComponent(startDate)}${endPart}/`

  const response = await fetch(url)
  const data = await response.json()
  return data.filter((event: EventDataProps) =>
    event.title.toLowerCase().includes("dscov")
  )
}

export async function getEventData(startDate: string, endDate?: string) {
  const [ccvData, dscovData] = await Promise.all([
    getCCVData(startDate, endDate),
    getDscovData(startDate, endDate),
  ])

  const combinedData = [...ccvData, ...dscovData]
  combinedData.sort(compareDates)
  return combinedData
}

function compareDates(a: EventDataProps, b: EventDataProps): number {
  const timeA = new Date(a.date_iso ?? "").getTime()
  const timeB = new Date(b.date_iso ?? "").getTime()

  const validA = Number.isFinite(timeA)
  const validB = Number.isFinite(timeB)

  if (!validA && !validB) return 0
  if (!validA) return 1 // invalid goes to end
  if (!validB) return -1 // invalid goes to end

  return timeA - timeB
}

export default EventSection
