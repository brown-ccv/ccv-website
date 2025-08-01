import React from "react"
import {
  ServiceConfig,
  ServiceFeature,
  featureIcons,
} from "@/lib/storage-types"
import { CardContainer } from "@/components/card/CardContainer"
import { Badge } from "@/components/ui/Badge"
import { humanize } from "@/lib/utils"

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
      <div className="ml-6 text-sm text-neutral-500 font-normal italic tracking-tight">
        <ul className="list-disc list-inside space-y-0.5">
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
    <CardContainer title={humanize(service.name)} isDisabled={isDisabled}>
      {service.features?.map((feature) => {
        const IconComponent = featureIcons[feature.name.toLowerCase()]

        return (
          <div key={feature.name} className="space-y-2 py-2">
            {/* Feature name and icon */}
            <div className="flex items-center gap-2 text-neutral-500 font-semibold tracking-wide">
              {IconComponent ? (
                <IconComponent className="text-lg flex-shrink-0 mt-0.5" />
              ) : null}
              <span className="break-words">
                {humanize(feature.name).toUpperCase()}:
              </span>
            </div>

            <Badge
              value={feature.value}
              autoColor={true}
              className="rounded-full font-semibold text-sm ml-6"
            >
              {humanize(formatFeatureDisplayValue(feature))}
            </Badge>
            {feature.notes && renderNotes(feature.notes)}
          </div>
        )
      })}
    </CardContainer>
  )
}

export default StorageServiceCard
