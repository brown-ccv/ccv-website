"use client"

import { useState, ReactNode } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

interface CopyableTextProps {
  children: ReactNode
  side?: "left" | "right" | "top" | "bottom"
  className?: string
}

export function CopyableText({
  children,
  side = "right",
  className = "",
}: CopyableTextProps) {
  const [copied, setCopied] = useState(false)

  const copyText = async () => {
    // Extract text content from children
    const text =
      typeof children === "string"
        ? children
        : extractTextFromChildren(children)

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (err) {
      // Optionally, provide fallback feedback to the user
      alert(`Failed to copy ${text} to clipboard. Please copy manually.`)
    } finally {
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={`cursor-pointer font-bold text-keppel-800 hover:underline ${className}`}
            onClick={copyText}
            aria-label="Copy text to clipboard"
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align="end"
          className="bg-sunglow-400 text-md text-black"
        >
          ✓ Copied!
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Helper function to extract text from React children
function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }

  return ""
}
