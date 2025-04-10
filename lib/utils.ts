import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToID = (targetId: string) => {
  const targetElement = document.getElementById(targetId)
  return targetElement?.scrollIntoView({ behavior: "smooth" })
}
