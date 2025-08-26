import { ServiceConfig } from "@/lib/storage-types"

/**
 * Extracts all unique feature names from an array of services.
 * @param services Array of ServiceConfig objects
 * @returns Array of unique feature names (strings)
 */
export function getAllUniqueFeatureNames(services: ServiceConfig[]): string[] {
  const uniqueFeatureNames = new Set<string>()
  services.forEach((service) => {
    service.features?.forEach((feature) => {
      uniqueFeatureNames.add(feature.name)
    })
  })
  return Array.from(uniqueFeatureNames)
}

/**
 * Sorts features or feature names according to the order in questionsConfig, then alphabetically.
 * Accepts an array of features ({ name: string }) or feature names (string[]), and a questionsConfig array.
 * @template T - Either { name: string } or string
 * @param features Array of features or feature names
 * @param questionsConfig Array of question configs with affected_feature
 * @returns Sorted array of features or feature names
 */
export function sortFeatures<T extends { name: string } | string>(
  features: T[],
  questionsConfig: { affected_feature: string }[]
): T[] {
  if (!features) return []
  if (!questionsConfig) {
    return features.slice().sort((a, b) => {
      const aName = typeof a === "string" ? a : a.name
      const bName = typeof b === "string" ? b : b.name
      return aName.localeCompare(bName)
    })
  }
  const questionOrder = questionsConfig.map((q) => q.affected_feature)
  return features.slice().sort((a, b) => {
    const aName = typeof a === "string" ? a : a.name
    const bName = typeof b === "string" ? b : b.name
    const aIndex = questionOrder.indexOf(aName)
    const bIndex = questionOrder.indexOf(bName)
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    return aName.localeCompare(bName)
  })
}

// Storage-specific badge utility functions

/**
 * Maps feature names to appropriate badge colors for consistent styling
 */
export const getBadgeColorForFeature = (featureName: string): string => {
  const featureMap: Record<string, string> = {
    speed: "fast",
    performance: "fast",
    relative_speed: "fast",
    security: "high",
    data_protection: "high",
    encryption: "high",
    cost: "medium-cost",
    pricing: "medium-cost",
    capacity: "large",
    storage: "large",
    size: "large",
    availability: "high",
    uptime: "high",
    integration: "partial",
    compatibility: "partial",
    network: "medium",
    connectivity: "medium",
    default: "default",
  }
  const normalizedName = featureName.toLowerCase().replace(/_/g, "")
  return featureMap[normalizedName] || featureMap["default"]
}

// Storage-specific and semantic badge color variants for use in storage components
export const storageBadgeColorVariants = {
  "red-university": "bg-red-university text-white",
  "amber-600": "bg-amber-600 text-white",
  "keppel-600": "bg-keppel-600 text-white",
  "sunglow-400": "bg-sunglow-400 text-black",
  "cyan-500": "bg-cyan-500 text-white",
  "neutral-200": "bg-neutral-200 text-black",
  high: "bg-red-university text-white",
  medium: "bg-amber-600 text-white",
  low: "bg-keppel-600 text-white",
  true: "bg-keppel-600 text-white",
  false: "bg-red-university text-white",
  easy: "bg-keppel-600 text-white",
  complex: "bg-red-university text-white",
  partial: "bg-sunglow-400 text-black",
  "low-cost": "bg-keppel-600 text-white",
  "medium-cost": "bg-sunglow-400 text-black",
  "high-cost": "bg-red-university text-white",
  hot: "bg-red-university text-white",
  warm: "bg-sunglow-400 text-black",
  cold: "bg-cyan-500 text-white",
  fastest: "bg-keppel-600 text-white",
  faster: "bg-amber-600 text-white",
  fast: "bg-sunglow-400 text-black",
  slow: "bg-red-university text-white",
  small: "bg-cyan-500 text-white",
  large: "bg-sunglow-400 text-black",
  default: "bg-neutral-200 text-black",
}
