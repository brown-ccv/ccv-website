"use client"
import React, { use, useState, useEffect } from "react"
import Link from "next/link"
import { LinkCard } from "@/components/LinkCard"
import {
  MapPinIcon,
  ArrowRightIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid"
import Spinner from "@/components/assets/Spinner"

export interface OpportunityProps {
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

export function Opportunities({ data }: { data: OpportunityProps }) {
  const opportunities = use(data)
  return (
    <section>
      {opportunities.jobPostings.length > 0 &&
        opportunities.jobPostings.map((position) => {
          return (
            <div
              key={position.externalPath}
              className="flex flex-col m-4 gap-6"
            >
              <a
                key={position.externalPath}
                className="position-block text-secondary-blue-700 hover:text-black"
                href={`https://brown.wd5.myworkdayjobs.com/en-US/staff-careers-brown${position.externalPath}`}
              >
                <LinkCard>
                  <div className="flex flex-col gap-6 md:items-center md:justify-between md:flex-row">
                    <div className="flex flex-col gap-2">
                      <p className="flex items-center text-secondary-blue-700 gap-2 md:gap-4">
                        <MapPinIcon className="h-4 w-4" /> Providence, RI -
                        United States
                      </p>
                      <p className="text-gray-800">{position.title}</p>
                    </div>

                    <div className="flex items-center gap-2 md:gap-6">
                      <p>Learn More</p>
                      <ArrowRightIcon className="h-4 w-4" />
                    </div>
                  </div>
                </LinkCard>
              </a>
            </div>
          )
        })}
    </section>
  )
}
