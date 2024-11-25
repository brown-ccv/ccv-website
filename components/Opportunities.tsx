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

  useEffect(() => {
    fetch("/api/opportunities")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p className="text-neutral-900">Loading...</p>
  if (!data) return <p className="text-neutral-900">No profile data</p>

  return (
    <div className="text-neutral-900">
      {data.jobPostings.length > 0 &&
        data.jobPostings.map((position) => {
          return (
            <div
              key={position.externalPath}
              className="flex flex-col gap-6 m-4"
            >
              <h2 className="text-3xl bg-primary-500 text-white p-4">
                Opportunities
              </h2>
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
