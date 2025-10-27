// --- Import Icons ---
import {
  FaCamera,
  FaChalkboardTeacher,
  FaDollarSign,
  FaExchangeAlt,
  FaFile,
  FaHdd,
  FaNetworkWired,
  FaShareSquare,
  FaShieldAlt,
  FaSyncAlt,
  FaTachometerAlt,
  FaThermometerHalf,
  FaWifi,
} from "react-icons/fa"
import { SiDoi } from "react-icons/si"

// --- Helper Mappings for Icons and Feature Value Colors ---
export const featureIcons: Record<string, React.ElementType> = {
  relative_speed: FaTachometerAlt,
  security: FaShieldAlt,
  cost: FaDollarSign,
  sharing: FaShareSquare,
  capacity: FaHdd,
  doi_provided: SiDoi,
  data_protection_snapshots: FaCamera,
  data_protection_replication: FaSyncAlt,
  canvas_integration: FaChalkboardTeacher,
  brown_network_required: FaWifi,
  access_from_oscar: FaNetworkWired,
  storage_warmth: FaThermometerHalf,
  collaborative_edits: FaExchangeAlt,
  shareable_link: FaShareSquare,
  max_file_size: FaFile,
  storage: FaHdd,
}

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
