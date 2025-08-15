"use client"

import React from "react"
import { ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/solid"
import { Card, CardContent } from "@/components/ui/Card"
import ButtonLink from "@/components/button/ButtonLink"

interface PositionProps {
  title: string
  externalPath: string
  locationsText: string
  postedOn: string
  bulletFields: string[]
}

export function Workday({ careers }: { careers: any[] }) {
  return (
    <>
      {careers && careers.length > 0 ? (
        careers.map((position: PositionProps) => (
          <ButtonLink
            key={position.externalPath}
            href={`https://brown.wd5.myworkdayjobs.com/en-US/staff-careers-brown${position.externalPath}`}
            className="m-4 block"
          >
            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-700 flex items-center gap-2 text-sm md:gap-4">
                    <MapPinIcon className="h-4 w-4" />
                    Providence, RI - United States
                  </p>
                  <p className="text-lg font-medium text-gray-800">
                    {position.title}
                  </p>
                </div>
                <div className="text-700 flex items-center gap-2 text-sm font-medium md:gap-4">
                  <span>Learn More</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </ButtonLink>
        ))
      ) : (
        <p className="text-2xl">
          There are no positions open at the moment. Check back with us in the
          future. We appreciate your interest!
        </p>
      )}
    </>
  )
}
