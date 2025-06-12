import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export const scrollToID = (targetId: string) => {
  const targetElement = document.getElementById(targetId)
  return targetElement?.scrollIntoView({ behavior: "smooth" })
}

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