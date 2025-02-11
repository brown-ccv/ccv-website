"use client"


import React from "react"
import { ServiceDisruptionProps } from "./types"
import ViewIncidentsButton from "./ViewIncidentsButton"
import CloseButton from "./CloseButton"

const ServiceDisruptionBanner: React.FC<ServiceDisruptionProps> = ({
  services,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex overflow-hidden flex-wrap gap-7 py-2.5 pr-3.5 pl-20 bg-red-700 max-md:pl-5">
        <div className="flex gap-1.5 my-auto text-xs text-white">
          <div className="grow font-bold">Service Disruption:</div>
          <div>{services.join(", ")}</div>
        </div>
        <div className="flex flex-wrap flex-auto gap-10 text-xs text-center text-black max-md:max-w-full">
          <ViewIncidentsButton />
          <CloseButton />
        </div>
      </div>
    </div>
  )
}

export default ServiceDisruptionBanner
