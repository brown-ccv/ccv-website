import { StyledCard } from "@/components/card/StyledCard"
import React from "react"

interface RatesCardProps {
  title: string
  partition?: string
  cores?: string
  memory?: string
  gpu?: string
  walltime?: string
  cost: string
  qos?: string
  location?: string
  allocation?: string
}

export const RatesCard: React.FC<RatesCardProps> = ({
  title,
  partition,
  cores,
  memory,
  gpu,
  walltime,
  cost,
  qos,
  location,
  allocation,
}) => {
  return (
    <StyledCard 
      title={title} 
      size="custom"
      className="w-80 flex-shrink-0"
    >
      <div className="gap-y-0 not-prose">
        {partition && (
          <p>
            <span className="font-semibold">Partition:</span> {partition}
          </p>
        )}
        {cores && (
          <p>
            <span className="font-semibold">CPU Cores:</span> {cores}
          </p>
        )}
        {memory && (
          <p>
            <span className="font-semibold">Memory:</span> {memory}
          </p>
        )}
        {gpu && (
          <p>
            <span className="font-semibold">GPU:</span> {gpu}
          </p>
        )}
        {walltime && (
          <p>
            <span className="font-semibold">Max Walltime:</span> {walltime}
          </p>
        )}
        {location && (
          <p>
            <span className="font-semibold">Location:</span> {location}
          </p>
        )}
        {allocation && (
          <p>
            <span className="font-semibold">Storage Allocation:</span> {allocation}
          </p>
        )}
        <p>
          <span className="font-semibold">Cost:</span> {cost}
        </p>
        {qos && (
          <p>
            <span className="font-semibold">Quality-of-Service (QOS):</span> {qos}
          </p>
        )}
      </div>
    </StyledCard>
  )
}
