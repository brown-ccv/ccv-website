import { type ClassValue, clsx } from "clsx"
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
  "gray",
  "red",
] as const

export type TagColor = (typeof tagColors)[number]

// Create a map to store tag-to-color assignments
const tagColorMap: Record<string, TagColor> = {}

export const getColorForTag = (tag: string): TagColor => {
  // If the tag already has an assigned color, return it
  if (tagColorMap[tag]) {
    return tagColorMap[tag]
  }

  // If not, generate a color based on the tag
  const hash = Array.from(tag).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  )
  const color = tagColors[hash % tagColors.length]

  // Store the assignment in the map
  tagColorMap[tag] = color

  return color
}

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
  if (typeof str !== "string") {
    return ""
  }
  const cleanStr = str.replace(/_/g, " ")
  if (cleanStr.length === 0) {
    return ""
  }
  return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1)
}

/**
 * Converts a URL path to breadcrumb format with title case
 * Example: "/services/ai-tools" -> "Services > Ai Tools"
 */
export function urlToBreadcrumb(url: string): string {
  const segments = url
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean)

  const formatted = segments.map((segment) => {
    const cleanSegment = segment.replace(/[_-]/g, " ")

    return cleanSegment
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  })

  return formatted.join(" > ")
}
