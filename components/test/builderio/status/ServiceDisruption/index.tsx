import React from "react"
import ServiceDisruptionBanner from "./ServiceDisruptionBanner"

const ServiceDisruption: React.FC = () => {
  const disruptedServices = ["oscar", "Hibernate"]

  return (
    <>
      <ServiceDisruptionBanner services={disruptedServices} />
      <div className="box-border absolute shrink-0 h-auto left-[-3518.14314530045px] top-[-714.9445941898772px] w-[1593px]">
        Enter some text...
      </div>
    </>
  )
}

export default ServiceDisruption
