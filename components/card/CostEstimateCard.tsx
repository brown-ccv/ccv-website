import { StyledCard } from "@/components/card/StyledCard"
import React from "react"
import { FaClock, FaUserClock } from "react-icons/fa"

interface RatesCardProps {
  title: string
  time: string
  units: "month" | "months" | "year" | "years"
  engineers: string
  fte?: string
  className?: string
}

export const CostEstimateCard: React.FC<RatesCardProps> = ({
  title,
  time,
  units,
  engineers,
  fte = "40%",
  className,
}) => {
  return (
    <StyledCard
      title={title}
      iconName={"FaTshirt"}
      size="xs"
      className={className}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <FaClock className="text-keppel-700" />
          <p className="!my-2">
            <span className="font-semibold">{time}</span> {units}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <FaUserClock className="text-sunglow-500" />
          <p className="!my-2">
            <span className="font-semibold">{engineers}</span> {fte} FTE*
          </p>
        </div>
      </div>
    </StyledCard>
  )
}
