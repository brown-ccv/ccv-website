import React from "react"
import { ServiceConfig, ServiceFeature } from "@/lib/storage-types"
import { Badge } from "@/components/ui/Badge"
import { humanize } from "@/lib/utils"
import { CollapsableCard } from "@/components/card/CollapsableCard"

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

  return (
    <CollapsableCard
      title={humanize(service.serviceName)}
      isDisabled={isDisabled}
      size="sm"
      className="min-w-80 md:min-w-96"
    >
      <ul className="space-y-3 p-2">
        {Object.entries(service).map(([key, value]) => {
          const feature = value as ServiceFeature
          if (feature.name) {
            return (
              <li key={key} className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  {humanize(feature.name)}:
                </span>
                <Badge
                  value={feature.value}
                  autoColor={true}
                  className="ml-6 rounded-full text-sm font-semibold"
                >
                  {humanize(formatFeatureDisplayValue(feature))}
                </Badge>
              </li>
            )
          }
        })}
      </ul>
    </CollapsableCard>
  )
}

export default StorageServiceCard
