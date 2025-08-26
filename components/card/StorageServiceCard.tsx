import React from "react"
import {
  ServiceConfig,
  ServiceFeature,
  featureIcons,
  featureColorMap,
} from "@/lib/storage-types"
import { StyledCard } from "@/components/card/StyledCard"
import { Badge } from "@/components/ui/Badge"
import { cn, humanize } from "@/lib/utils"
import Icon from "@/components/ui/RenderIcon"

interface ServiceCardProps {
  service: ServiceConfig
  isDisabled: boolean
}

const StorageServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isDisabled,
}) => {
  // Helper to format the display value of a feature class
  const formatFeatureDisplayValue = (feature: ServiceFeature): string => {
    if (typeof feature.value === "boolean") {
      return feature.value ? "Yes" : "No"
    }
    if (feature.name === "security" && typeof feature.value === "number") {
      return `Level ${feature.value}`
    }
    return String(feature.value)
  }

  // Helper to render notes
  const renderNotes = (notes: string[]) => {
    if (!notes || notes.length === 0) return null

    return (
      <div className="ml-6 text-sm font-normal italic tracking-tight text-neutral-500">
        <ul className="list-inside list-disc space-y-0.5">
          {notes.map((note, index) => (
            <li key={index} className="break-words">
              {note}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <StyledCard
      title={humanize(service.serviceName)}
      isDisabled={isDisabled}
      className="max-w-sm flex-grow"
    >
      <div className="space-y-3 p-2">
        {Object.entries(service).map(([key, value]) => {
          const feature = value as ServiceFeature
          if (feature.name) {
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-base font-semibold uppercase tracking-wide text-neutral-500">
                  {humanize(feature.name)}:
                </span>
                <Badge
                  value={feature.value}
                  autoColor={true}
                  className="ml-6 rounded-full text-sm font-semibold"
                >
                  {humanize(formatFeatureDisplayValue(feature))}
                </Badge>
              </div>
            )
          }
        })}
      </div>
    </StyledCard>
  )
}

export default StorageServiceCard
