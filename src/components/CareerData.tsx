"use client"

import React, { useEffect, useState } from "react"
import { Workday } from "@/components/Workday"
import { Spinner } from "@/components/assets/Spinner"

export function CareerData() {
  const [careers, setCareers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCareers() {
      const res = await fetch("/api/workday")
      const data = await res.json()
      setCareers(data)
      setLoading(false)
    }

    fetchCareers()
  }, [])

  if (loading) return <Spinner />
  return <Workday careers={careers} />
}
