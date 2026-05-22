"use client"

import { JSX, useEffect, useState } from "react"
import { CalendarWeekly } from "@/components/calendar/CalendarWeekly"
import { CalendarMonth } from "@/components/calendar/CalendarMonth"
import { UpcomingEvents } from "@/components/calendar/UpcomingEvents"
import { StyledTabs } from "@/components/StyledTabs"
import { Spinner } from "@/components/assets/Spinner"
import { getEventData } from "@/app/queries"
import { FaExclamationTriangle } from "react-icons/fa"

export interface DataProps {
  id: number
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
      } catch {
        if (!active) return
        setError("Unable to load events right now.")
      } finally {
        if (!active) setLoading(false)
      }
    }

    loadEvents()

    return () => {
      active = false
    }
  }, [])

  if (loading || !currentDate || !pastDates || !futureDates) return <Spinner />
  if (error)
    return (
      <div role="alert" className="flex items-center justify-center">
        <FaExclamationTriangle
          className="mr-3 flex-shrink-0 text-red-university md:mr-2"
          aria-label="Error: "
        />
        {error} If the problem persists, please contact support.
      </div>
    )

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
    getEventData(`-2 months${today}`),
    getEventData(today),
  ])
  return [past, future]
}

/**
 * Converts a date to YYYY-MM-DD using ISO format.
 */
function getTodayIsoDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export default EventSection
