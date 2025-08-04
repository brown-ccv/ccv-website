import { StyledCard } from "@/components/card/StyledCard"
import React from "react"
import { FaClock, FaUserClock } from "react-icons/fa"

interface RatesCardProps {
  title: string
  time: string
  units: "month" | "months" | "year" | "years"
  engineers: string
  fte?: string
}

export const CostEstimateCard: React.FC<RatesCardProps> = ({
  title,
  time,
  units,
  engineers,
  fte = "40%",
}) => {
  return (
    <StyledCard title={title} iconName={"FaTshirt"}>
      <div className="flex flex-col items-center justify-center gap-y-6 py-6">
        <div className="flex items-center gap-6">
          <FaClock className="text-keppel-700 text-2xl" />
          <p>
            <span className="font-semibold text-2xl">{time}</span> {units}
          </p>
        </div>
        <div className={"flex items-center gap-6"}>
          <FaUserClock className="text-sunglow-500 text-2xl" />
          <p>
            <span className="font-semibold text-2xl">{engineers}</span> {fte}{" "}
            FTE*
          </p>
        </div>
      </div>
    </StyledCard>
  )
}
