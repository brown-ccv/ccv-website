"use client"

import React, { use } from "react"
import {
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

interface PositionProps {
  title: string
  externalPath: string
  locationsText: string
  postedOn: string
  bulletFields: string[]
}

export function Opportunities({ data }: { data: Promise<any> }) {
  const opportunities = use(data)

  return (
    <>
      {opportunities.jobPostings.length > 0 &&
        opportunities.jobPostings.map((position: PositionProps) => (
          <a
            key={position.externalPath}
            href={`https://brown.wd5.myworkdayjobs.com/en-US/staff-careers-brown${position.externalPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block m-4"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col gap-6 md:items-center md:justify-between md:flex-row p-6">
                <div className="flex flex-col gap-2">
                  <p className="flex items-center text-sunglow-blue-700 gap-2 md:gap-4 text-sm">
                    <MapPinIcon className="h-4 w-4" />
                    Providence, RI - United States
                  </p>
                  <p className="text-gray-800 text-lg font-medium">
                    {position.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-sunglow-blue-700 text-sm font-medium">
                  <span>Learn More</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
    </>
  )
}