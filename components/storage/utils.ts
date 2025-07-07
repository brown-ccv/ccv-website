import { ServiceConfig } from '@/lib/storage-types';

/**
 * Extracts all unique feature names from an array of services.
 * @param services Array of ServiceConfig objects
 * @returns Array of unique feature names (strings)
 */
export function getAllUniqueFeatureNames(services: ServiceConfig[]): string[] {
  const uniqueFeatureNames = new Set<string>();
  services.forEach(service => {
    service.features?.forEach(feature => {
      uniqueFeatureNames.add(feature.name);
    });
  });
  return Array.from(uniqueFeatureNames);
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
  if (!features) return [];
  if (!questionsConfig) {
    return features.slice().sort((a, b) => {
      const aName = typeof a === 'string' ? a : a.name;
      const bName = typeof b === 'string' ? b : b.name;
      return aName.localeCompare(bName);
    });
  }
  const questionOrder = questionsConfig.map(q => q.affected_feature);
  return features.slice().sort((a, b) => {
    const aName = typeof a === 'string' ? a : a.name;
    const bName = typeof b === 'string' ? b : b.name;
    const aIndex = questionOrder.indexOf(aName);
    const bIndex = questionOrder.indexOf(bName);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return aName.localeCompare(bName);
  });
} 
// Storage-specific badge utility functions

/**
 * Determines whether text should be white or black based on the background color
 * Uses WCAG contrast guidelines for accessibility
 * 
 * @param {string} backgroundColor - The background color (CSS class or hex)
 * @returns {string} - 'text-white' or 'text-black'
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  const colorMap: Record<string, string> = {
    'bg-keppel-500': 'text-white',
    'bg-keppel-600': 'text-white',
    'bg-keppel-700': 'text-white',
    'bg-sunglow-400': 'text-black',
    'bg-sunglow-200': 'text-black',
    'bg-red-university': 'text-white',
    'bg-red-500': 'text-white',
    'bg-red-600': 'text-white',
    'bg-amber-600': 'text-white',
    'bg-amber-500': 'text-white',
    'bg-cyan-500': 'text-white',
    'bg-purple-900': 'text-white',
    'bg-purple-500': 'text-white',
    'bg-blue-500': 'text-white',
    'bg-blue-600': 'text-white',
    'bg-pink-500': 'text-white',
    'bg-neutral-800': 'text-white',
    'bg-neutral-900': 'text-white',
    'bg-neutral-200': 'text-black',
    'bg-neutral-300': 'text-black',
    'bg-neutral-400': 'text-white',
    'bg-neutral-500': 'text-white',
    'bg-neutral-600': 'text-white',
    'bg-neutral-700': 'text-white',
  };
  return colorMap[backgroundColor] || 'text-black';
};

/**
 * Maps feature values to badge background colors based on the storage-types color map
 */
export const getBadgeBackgroundColor = (value: string | boolean | number): string => {
  const stringValue = String(value).toLowerCase();
  const backgroundMap: Record<string, string> = {
    'high': 'bg-red-university',
    'medium': 'bg-amber-600', 
    'low': 'bg-keppel-600',
    '0': 'bg-keppel-600',
    '1': 'bg-sunglow-400',
    '2': 'bg-amber-600',
    '3': 'bg-red-university',
    'true': 'bg-keppel-600',
    'false': 'bg-red-university',
    'easy': 'bg-keppel-600',
    'complex': 'bg-red-university',
    'partial': 'bg-sunglow-400',
    'low cost': 'bg-keppel-600',
    'medium cost': 'bg-sunglow-400',
    'high cost': 'bg-red-university',
    'hot': 'bg-red-university',
    'warm': 'bg-sunglow-400',
    'cold': 'bg-cyan-500',
    'fastest': 'bg-keppel-600',
    'faster': 'bg-amber-600',
    'fast': 'bg-sunglow-400',
    'slow': 'bg-red-university',
    'small': 'bg-cyan-500',
    'large': 'bg-sunglow-400',
    '4 gb': 'bg-red-university',
    '1 tb': 'bg-amber-600',
    '1 tb +': 'bg-sunglow-400',
    '2 tb +': 'bg-sunglow-400',
    '4 tb': 'bg-sunglow-400',
    '128 tb': 'bg-sunglow-400',
    '8 eb': 'bg-keppel-600',
    '9 eb': 'bg-keppel-600',
    'unlimited': 'bg-keppel-600',
    'default': 'bg-neutral-200',
  };
  return backgroundMap[stringValue] || backgroundMap['default'];
};

/**
 * Maps feature names to appropriate badge colors for consistent styling
 */
export const getBadgeColorForFeature = (featureName: string): string => {
  const featureMap: Record<string, string> = {
    'speed': 'fast',
    'performance': 'fast',
    'relative_speed': 'fast',
    'security': 'high',
    'data_protection': 'high',
    'encryption': 'high',
    'cost': 'medium-cost',
    'pricing': 'medium-cost',
    'capacity': 'large',
    'storage': 'large',
    'size': 'large',
    'availability': 'high',
    'uptime': 'high',
    'integration': 'partial',
    'compatibility': 'partial',
    'network': 'medium',
    'connectivity': 'medium',
    'default': 'default',
  };
  const normalizedName = featureName.toLowerCase().replace(/_/g, '');
  return featureMap[normalizedName] || featureMap['default'];
};

/**
 * Gets the complete badge styling for a feature value
 */
export const getBadgeStyling = (value: string | boolean | number) => {
  const backgroundColor = getBadgeBackgroundColor(value);
  const textColor = getTextColorForBackground(backgroundColor);
  return {
    backgroundColor,
    textColor,
    className: `${backgroundColor} ${textColor}`
  };
};

// Storage-specific and semantic badge color variants for use in storage components
export const storageBadgeColorVariants = {
  'red-university': "bg-red-university text-white",
  'amber-600': "bg-amber-600 text-white",
  'keppel-600': "bg-keppel-600 text-white",
  'sunglow-400': "bg-sunglow-400 text-black",
  'cyan-500': "bg-cyan-500 text-white",
  'neutral-200': "bg-neutral-200 text-black",
  high: "bg-red-university text-white",
  medium: "bg-amber-600 text-white",
  low: "bg-keppel-600 text-white",
  true: "bg-keppel-600 text-white",
  false: "bg-red-university text-white",
  easy: "bg-keppel-600 text-white",
  complex: "bg-red-university text-white",
  partial: "bg-sunglow-400 text-black",
  'low-cost': "bg-keppel-600 text-white",
  'medium-cost': "bg-sunglow-400 text-black",
  'high-cost': "bg-red-university text-white",
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
}; 
