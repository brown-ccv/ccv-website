export const featureColorMap: Record<string, string> = {
  "0": "text-keppel-700",
  "1": "text-sunglow-400",
  "2": "text-amber-600",
  "3": "text-red-university",
  true: "text-keppel-700",
  false: "text-red-university",
  hot: "text-red-university",
  warm: "text-sunglow-400",
  cold: "text-indigo-800",
  fastest: "text-keppel-700",
  faster: "text-amber-600",
  fast: "text-sunglow-400",
  slow: "text-red-university",
  default: "text-neutral-600",
}

// Content
export interface ServiceFeature {
  name: string
  value: string | boolean | number
  sortValue: number
  notes?: string[]
}

export interface ServiceLink {
  text: string
  target: string
  category?: string
}

export interface FeatureMetadata {
  name: string
  display_name: string
  icon: string
}

export interface StorageData {
  metadata: {
    total_services: number
    total_features: number
    feature_names: string[]
    feature_metadata: Record<string, FeatureMetadata>
  }
  table_data: ServiceConfig[]
}

export interface ServiceConfig {
  serviceName: string
  documentation: string
  description?: string
  links?: ServiceLink[]

  [key: string]: any // For dynamic feature columns
}

// Form

export interface FormQuestions {
  id: string
  question: string
  default_answer: string
  options: { label: string; value: (string | number | boolean)[] }[]
  information?: string[]
  link?: { label: string; value: string }
}

// Form and Table
export interface SelectedAnswers {
  [key: string]: string
}
