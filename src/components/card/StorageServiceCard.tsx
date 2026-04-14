import React from "react"
import { ServiceConfig, ServiceFeature } from "@/lib/storage-types"
import { Badge } from "@/components/ui/Badge"
import { humanize } from "@/lib/utils"
import { CollapsableCard } from "@/components/card/CollapsableCard"
import { Link } from "@/components/Link"
import Icon from "@/components/ui/RenderIcon"

interface ServiceCardProps {
  service: ServiceConfig
  isDisabled: boolean
}

export function StorageServiceCard({ service, isDisabled }: ServiceCardProps) {
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
      id={service.serviceName}
      title={humanize(service.serviceName)}
      isDisabled={isDisabled}
      size="sm"
      className="min-w-80 md:min-w-96"
    >
      <Link
        href={service.documentation}
        className="mx-2 inline-flex items-center gap-1 px-2 py-2 font-medium text-keppel-800 transition-colors hover:text-keppel-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sunglow-400"
        aria-label={`documentation for ${humanize(service.serviceName)}`}
      >
        <span>Documentation</span>
        <Icon iconName="FaExternalLinkAlt" size={10} aria-hidden="true" />
      </Link>
      <ul className="mx-2 space-y-3 p-2">
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
