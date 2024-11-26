"use client"
import React, { useState, useEffect } from "react"
import { LinkCard } from "@/components/LinkCard"
import {
  MapPinIcon,
  ArrowRightIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid"

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
      <h2 className="text-3xl bg-primary-500 text-white p-4 flex items-center gap-2">
        <UserPlusIcon className="h-7 w-7" />
        Opportunities
      </h2>
      {isLoading && <p className="px-2 font-bold">Loading...</p>}
      {error && <p className="px-2 font-bold text-red">Error: {error}</p>}
      {data.jobPostings.length > 0 &&
        data.jobPostings.map((position) => {
          return (
            <div
              key={position.externalPath}
              className="flex flex-col gap-6 m-4"
            >
              <a
                key={position.externalPath}
                className="position-block text-secondary-blue-700 hover:text-black"
                href={`https://brown.wd5.myworkdayjobs.com/en-US/staff-careers-brown${position.externalPath}`}
              >
                <LinkCard>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="flex items-center gap-4 text-secondary-blue-700">
                        <MapPinIcon className="h-4 w-4" /> Providence, RI -
                        United States
                      </p>
                      <p className="text-gray-800">{position.title}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <p>Learn More</p>
                      <ArrowRightIcon className="h-4 w-4" />
                    </div>
                  </div>
                </LinkCard>
              </a>
            </div>
          )
        })}
    </div>
  )
}
