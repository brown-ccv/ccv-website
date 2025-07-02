import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * generates a color for each unique tag in a list
 *
 * @param {tag} str The tag to be assigned a color
 */

// Possible tag colors
export const tagColors = [
  "keppel",
  "sunglow",
  "purple", 
  "blue",
  "pink",
  "red",
] as const

export type TagColor = typeof tagColors[number]

// Create a map to store tag-to-color assignments
const tagColorMap: Record<string, TagColor> = {};

export const getColorForTag = (tag: string): TagColor => {
  // If the tag already has an assigned color, return it
  if (tagColorMap[tag]) {
    return tagColorMap[tag];
  }

  // If not, generate a color based on the tag
  const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = tagColors[hash % tagColors.length];

  // Store the assignment in the map
  tagColorMap[tag] = color;

  return color;
};

/**
 * Scrolls to an html element, often used with a button click
 *
 * @param {targetId} str ID in html element to scroll to
 */
export const scrollToID = (targetId: string) => {
  const targetElement = document.getElementById(targetId)
  return targetElement?.scrollIntoView({ behavior: "smooth" })
}

/**
 * Cleans up strings, removing underscores and uppercases first letter
 * Type safe for none strings (that may get passed in through content)
 *
 * @param {string} str The string to be cleaned
 */
export const humanize = (str: string | null | undefined): string => {
  if (typeof str !== 'string' || str === null) {
    return '';
  }
  const cleanStr = str.replace(/_/g, ' ');
  if (cleanStr.length === 0) {
    return '';
  }
  const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
  return upperFirst;
};

/**
 * Determines whether text should be white or black based on the background color
 * Uses WCAG contrast guidelines for accessibility
 * 
 * @param {string} backgroundColor - The background color (CSS class or hex)
 * @returns {string} - 'text-white' or 'text-black'
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  // Map of background colors to their appropriate text colors
  const colorMap: Record<string, string> = {
    // Keppel colors (green)
    'bg-keppel-500': 'text-white',
    'bg-keppel-600': 'text-white',
    'bg-keppel-700': 'text-white',
    
    // Sunglow colors (yellow)
    'bg-sunglow-400': 'text-black',
    'bg-sunglow-200': 'text-black',
    
    // Red colors
    'bg-red-university': 'text-white',
    'bg-red-500': 'text-white',
    'bg-red-600': 'text-white',
    
    // Amber colors
    'bg-amber-600': 'text-white',
    'bg-amber-500': 'text-white',
    
    // Cyan colors
    'bg-cyan-500': 'text-white',
    
    // Purple colors
    'bg-purple-900': 'text-white',
    'bg-purple-500': 'text-white',
    
    // Blue colors
    'bg-blue-500': 'text-white',
    'bg-blue-600': 'text-white',
    
    // Pink colors
    'bg-pink-500': 'text-white',
    
    // Neutral colors
    'bg-neutral-800': 'text-white',
    'bg-neutral-900': 'text-white',
    'bg-neutral-200': 'text-black',
    'bg-neutral-300': 'text-black',
    'bg-neutral-400': 'text-white',
    'bg-neutral-500': 'text-white',
    'bg-neutral-600': 'text-white',
    'bg-neutral-700': 'text-white',
  };
  
  return colorMap[backgroundColor] || 'text-black'; // Default to black text
};

/**
 * Maps feature values to badge background colors based on the storage-types color map
 * 
 * @param {string | boolean | number} value - The feature value
 * @returns {string} - The background color class for the badge
 */
export const getBadgeBackgroundColor = (value: string | boolean | number): string => {
  const stringValue = String(value).toLowerCase();
  
  // Map feature values to background colors (inverse of the text color map)
  const backgroundMap: Record<string, string> = {
    // High/Medium/Low
    'high': 'bg-red-university',
    'medium': 'bg-amber-600', 
    'low': 'bg-keppel-600',
    
    // Numeric levels
    '0': 'bg-keppel-600',
    '1': 'bg-sunglow-400',
    '2': 'bg-amber-600',
    '3': 'bg-red-university',
    
    // Boolean values
    'true': 'bg-keppel-600',
    'false': 'bg-red-university',
    
    // Complexity levels
    'easy': 'bg-keppel-600',
    'complex': 'bg-red-university',
    'partial': 'bg-sunglow-400',
    
    // Cost levels
    'low cost': 'bg-keppel-600',
    'medium cost': 'bg-sunglow-400',
    'high cost': 'bg-red-university',
    
    // Temperature levels
    'hot': 'bg-red-university',
    'warm': 'bg-sunglow-400',
    'cold': 'bg-cyan-500',
    
    // Speed levels
    'fastest': 'bg-keppel-600',
    'faster': 'bg-amber-600',
    'fast': 'bg-sunglow-400',
    'slow': 'bg-red-university',
    
    // Size levels
    'small': 'bg-cyan-500',
    'large': 'bg-sunglow-400',
    
    // Storage sizes
    '4 gb': 'bg-red-university',
    '1 tb': 'bg-amber-600',
    '1 tb +': 'bg-sunglow-400',
    '2 tb +': 'bg-sunglow-400',
    '4 tb': 'bg-sunglow-400',
    '128 tb': 'bg-sunglow-400',
    '8 eb': 'bg-keppel-600',
    '9 eb': 'bg-keppel-600',
    'unlimited': 'bg-keppel-600',
    
    // Default fallback
    'default': 'bg-neutral-200',
  };
  
  return backgroundMap[stringValue] || backgroundMap['default'];
};

/**
 * Maps feature names to appropriate badge colors for consistent styling
 * 
 * @param {string} featureName - The name of the feature
 * @returns {string} - The badge color variant to use
 */
export const getBadgeColorForFeature = (featureName: string): string => {
  const featureMap: Record<string, string> = {
    // Performance-related features
    'speed': 'fast',
    'performance': 'fast',
    'relative_speed': 'fast',
    
    // Security features
    'security': 'high',
    'data_protection': 'high',
    'encryption': 'high',
    
    // Cost features
    'cost': 'medium-cost',
    'pricing': 'medium-cost',
    
    // Capacity features
    'capacity': 'large',
    'storage': 'large',
    'size': 'large',
    
    // Availability features
    'availability': 'high',
    'uptime': 'high',
    
    // Integration features
    'integration': 'partial',
    'compatibility': 'partial',
    
    // Network features
    'network': 'medium',
    'connectivity': 'medium',
    
    // Default fallback
    'default': 'default',
  };
  
  const normalizedName = featureName.toLowerCase().replace(/_/g, '');
  return featureMap[normalizedName] || featureMap['default'];
};

/**
 * Gets the complete badge styling for a feature value
 * 
 * @param {string | boolean | number} value - The feature value
 * @returns {object} - Object with background and text color classes
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