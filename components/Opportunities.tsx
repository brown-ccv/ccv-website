"use client"
import React, { useState, useEffect } from "react"
import { Card } from "@/components/Card"

interface OpportunityProps {
  total: number
  jobPostings: PositionProps[]
  facets: Object[]
  userAuthenticated: boolean
}

interface PositionProps {
  title: string
  externalPath: string
  locationsText: string
  postedOn: string
  bulletFields: string[]
}

export const Opportunities: React.FC = () => {
  const initialData = {
    total: 0,
    jobPostings: [],
    userAuthenticated: false,
    facets: [],
  }
  const [data, setData] = useState<OpportunityProps>(initialData)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleApiCall = async () => {
    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`)
      }

      const opportunities = await res.json()
      setData(opportunities.json)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handleApiCall()
  }, [])

  return (
    <div className="text-neutral-900">
      <h2 className="text-3xl bg-primary-500 text-white p-4">Opportunities</h2>
      {isLoading && <p className="px-2 font-bold">Loading...</p>}
      {error && <p className="px-2 font-bold text-red">Error: {error}</p>}
      {data.jobPostings.length > 0 &&
        data.jobPostings.map((position) => {
          return (
            <div
              key={position.externalPath}
              className="flex flex-col gap-6 m-4"
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    Providence, RI - United States
                    <p className="has-text-dark">{position.title}</p>
                  </div>
                  <a
                    key={position.externalPath}
                    className="position-block underline"
                    href={`https://brown.wd5.myworkdayjobs.com/en-US/staff-careers-brown${position.externalPath}`}
                  >
                    <div>
                      <p>
                        Learn More
                        <span className="icon ml-3">
                          <i className="mdi mdi-arrow-right" />
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
              </Card>
            </div>
          )
        })}
    </div>
  )
}
