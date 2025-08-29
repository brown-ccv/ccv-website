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
    <StyledCard
      title={title}
      iconName={"FaTshirt"}
      className="max-w-sm md:max-w-xs"
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-6">
          <FaClock className="text-2xl text-keppel-700" />
          <p>
            <span className="text-2xl font-semibold">{time}</span> {units}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <FaUserClock className="text-2xl text-sunglow-500" />
          <p>
            <span className="text-2xl font-semibold">{engineers}</span> {fte}{" "}
            FTE*
          </p>
        </div>
      </div>
    </StyledCard>
  )
}
