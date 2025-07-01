// --- Import Icons ---
import {
  FaThermometerHalf,
  FaDollarSign,
  FaShareSquare,
  FaHdd,
  FaWifi,
  FaExchangeAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import { FaFile } from "react-icons/fa6";
import { SlSpeedometer } from "react-icons/sl";
import { MdSdStorage } from "react-icons/md";
import { AiOutlineCluster } from "react-icons/ai";
import { SiDoi } from "react-icons/si";
import { SiCanvas } from "react-icons/si";
import { MdOutlineFlipCameraIos } from "react-icons/md";
import { LuDatabaseBackup } from "react-icons/lu"

// --- Helper Mappings for Icons and Feature Value Colors ---
export const featureIcons: Record<string, React.ElementType> = {
  'relative_speed': SlSpeedometer,
  'security': FaShieldAlt,
  'cost': FaDollarSign,
  'sharing': FaShareSquare,
  'capacity': FaHdd,
  'doi_provided': SiDoi,
  'data_protection_snapshots': MdOutlineFlipCameraIos,
  'data_protection_replication': LuDatabaseBackup,
  'canvas_integration': SiCanvas,
  'brown_network_required': FaWifi,
  'access_from_oscar': AiOutlineCluster,
  'storage_warmth': FaThermometerHalf,
  'collaborative_edits': FaExchangeAlt,
  'shareable_link': FaShareSquare,
  'max_file_size': FaFile,
  'storage': MdSdStorage,
};

export const featureColorMap: Record<string, string> = {
  'high': 'text-red-university', 'medium': 'text-amber-600', 'low': 'text-keppel-600',
  '0': 'text-keppel-600', '1': 'text-sunglow-400', '2': 'text-amber-600', '3': 'text-red-university',
  'true': 'text-keppel-600', 'false': 'text-red-university',
  'easy': 'text-keppel-600', 'complex': 'text-red-university', 'partial': 'text-sunglow-400',

  'low cost': 'text-keppel-600', 'medium cost': 'text-sunglow-400', 'high cost': 'text-red-university',

  'hot': 'text-red-university', 'warm': 'text-sunglow-400', 'cold': 'text-cyan-500',
  'fastest': 'text-keppel-600', 'faster': 'text-amber-600', 'fast': 'text-sunglow-400', 'slow': 'text-red-university',

  'small': 'text-cyan-500', 'large': 'text-sunglow-400',
  '4 gb': 'text-red-university', '1 tb': 'text-amber-600',
  '1 tb +': 'text-sunglow-400', '2 tb +': 'text-sunglow-400', '4 tb': 'text-sunglow-400', '128 tb': 'text-sunglow-400',
  '8 eb': 'text-keppel-600', '9 eb': 'text-keppel-600', 'unlimited': 'text-keppel-600',

  'default': 'text-neutral-800',
};

// Content
export interface ServiceFeature {
  name: string;
  value: string | boolean | number;
  notes?: string;
}

export interface ServiceLink {
  text: string;
  target: string;
}

export interface ServiceConfig {
  name: string;
  description?: string;
  links?: ServiceLink[];
  features?: ServiceFeature[];
}

// Form
export interface QuestionAnswer {
  answer: string;
  matching_feature_values: (string | boolean | number)[];
}

export interface QuestionsConfig {
  question: string;
  information?: string;
  affected_feature: string;
  default_answer: string;
  answers: QuestionAnswer[];
}

export interface FormQuestions {
  id: string;
  question: string;
  options: { label: string; value: (string | number | boolean)[]; }[];
  information?: string;
}

// Table
export interface TableRow {
  featureName: string;
  [key: string]: ServiceFeature | undefined | string;
}

// Form and Table
export interface SelectedAnswers {
  [key: string]: string;
}

// Top-level structure of content file
export interface PageContentData {
  title: string;
  description: string;
  icon?: string;
  links?: ServiceLink[];
  storage_tool_header: string;
  services: ServiceConfig[];
  questions: QuestionsConfig[];
}