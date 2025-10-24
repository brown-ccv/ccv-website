import React from "react"
import { ServiceConfig, ServiceFeature } from "@/lib/storage-types"
import { StyledCard } from "@/components/card/StyledCard"
import { Badge } from "@/components/ui/Badge"
import { humanize } from "@/lib/utils"
import { ButtonLink } from "@/components/button/ButtonLink"
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

  return (
    <StyledCard isDisabled={isDisabled} size="sm" className="w-full">
      <div className="flex flex-col items-center justify-center border-b border-gray-300 py-4 text-center">
        <p className="mb-2 text-xl font-bold tracking-tight sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2">
          {humanize(service.serviceName)}
        </p>
        <ButtonLink
          variant="unstyled"
          external={true}
          className="flex gap-2 text-sm text-keppel-800 underline hover:text-keppel-600"
          href={service.documentation}
        >
          Learn More
          <Icon size={10} iconName="FaExternalLinkAlt" />
        </ButtonLink>
      </div>
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
    </StyledCard>
  )
}

export default StorageServiceCard
