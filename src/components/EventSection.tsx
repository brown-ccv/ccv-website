"use client"

import { JSX, useEffect, useState } from "react"
import { CalendarWeekly } from "@/components/calendar/CalendarWeekly"
import { CalendarMonth } from "@/components/calendar/CalendarMonth"
import { UpcomingEvents } from "@/components/calendar/UpcomingEvents"
import { StyledTabs } from "@/components/StyledTabs"
import { Spinner } from "@/components/assets/Spinner"

export interface DataProps {
  id: number
  is_all_day: boolean
  date: string
  date_utc: string
  date2_utc: string
  date_iso: string
  date_time: string
  title: string
  description_long: string
  url: string
}

export function EventSection(): JSX.Element {
  const [futureDates, setFutureDates] = useState<DataProps[] | null>(null)
  const [pastDates, setPastDates] = useState<DataProps[] | null>(null)
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [today, setToday] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadEvents(): Promise<void> {
      /**
       * Loads past and future event data and updates component state.
       */
      const now = new Date()
      const todayStr = getTodayIsoDate(now)

      setCurrentDate(now)
      setToday(todayStr)
      setLoading(true)

      const [past, future] = await fetchEventRanges(todayStr)

      if (!active) return
      console.log("Fetched past events:", past)
      console.log("Fetched future events:", future)

      setPastDates(past)
      setFutureDates(future)
      setLoading(false)
    }

    loadEvents()

    return () => {
      active = false
    }
  }, [])

  if (loading || !currentDate || !pastDates || !futureDates) return <Spinner />

  const dataFuture = futureDates
  const dataPast = pastDates

  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row xl:justify-between xl:gap-24">
      {/* Mobile: Show only upcoming events */}
      <div className="md:hidden">
        <UpcomingEvents events={dataFuture} />
      </div>

      {/* Desktop: Toggle and Views */}
      <div className="hidden w-full md:flex">
        <StyledTabs
          variant="neutral"
          tabs={[
            {
              value: "upcoming",
              label: "Upcoming",
              content: <UpcomingEvents events={dataFuture} />,
            },
            {
              value: "weekly",
              label: "Weekly",
              content: (
                <CalendarWeekly
                  events={dataPast.concat(dataFuture)}
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
                  events={dataPast.concat(dataFuture)}
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
): Promise<[DataProps[], DataProps[]]> {
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
  return data.filter((event: DataProps) =>
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

function compareDates(a: DataProps, b: DataProps): number {
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
