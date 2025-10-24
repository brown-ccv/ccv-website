"use client"

import React, { useEffect, useState } from "react"
import { getEventData } from "@/app/queries"
import { getStringDate } from "@/components/calendar/utils"
import EventSection from "@/components/EventSection"
import Spinner from "@/components/assets/Spinner"

export default function EventSectionClient() {
  const [futureDates, setFutureDates] = useState<any>(null)
  const [pastDates, setPastDates] = useState<any>(null)
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [today, setToday] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const now = new Date()
    setCurrentDate(now)
    const todayStr = getStringDate(
      now.getMonth() + 1,
      now.getDate(),
      now.getFullYear()
    )
    setToday(todayStr)

    const fetchData = async () => {
      setLoading(true)
      const [past, future] = await Promise.all([
        getEventData(`-2 months${todayStr}`),
        getEventData(todayStr),
      ])
      setPastDates(past)
      setFutureDates(future)
      setLoading(false)
    }
    fetchData()
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
