import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tagColors = [
  "keppel",
  "sunglow",
  "purple",
  "sky",
  "amber",
  "emerald",
  "blue",
  "rose",
  "cyan",
  "lime",
] as const

export type TagColor = typeof tagColors[number]

export const getColorForTag = (tag: string): TagColor => {
  const hash = Array.from(tag).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return tagColors[hash % tagColors.length]
}

export const scrollToID = (targetId: string) => {
  const targetElement = document.getElementById(targetId)
  return targetElement?.scrollIntoView({ behavior: "smooth" })
}
