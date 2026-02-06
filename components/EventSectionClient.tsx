"use client"

import React, { useEffect, useState } from "react"
import { getEventData } from "@/app/queries"
import { EventSection } from "@/components/EventSection"
import { Spinner } from "@/components/assets/Spinner"

export function EventSectionClient() {
  const [futureDates, setFutureDates] = useState<any>(null)
  const [pastDates, setPastDates] = useState<any>(null)
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [today, setToday] = useState<string>("")
  const [loading, setLoading] = useState(true)

  async function fetchData(today: string) {
    const [past, future] = await Promise.all([
      getEventData(`-2 months${today}`),
      getEventData(today),
    ])
    return [past, future]
  }

  useEffect(() => {
    const now = new Date()
    setCurrentDate(now)
    const todayStr = now.toISOString().split("T")[0]
    setToday(todayStr)

    setLoading(true)
    fetchData(todayStr).then(([past, future]) => {
      setPastDates(past)
      setFutureDates(future)
      setLoading(false)
    })
  }, [])

  if (loading || !currentDate) return <Spinner />

  return (
    <EventSection
      streamedDataPast={pastDates}
      streamedDataFuture={futureDates}
      currentDate={currentDate}
      today={today}
    />
  )
}
