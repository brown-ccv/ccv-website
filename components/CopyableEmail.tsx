"use client"

import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

interface CopyableEmailProps {
  email: string
  className?: string
}

export function CopyableEmail({ email, className = "" }: CopyableEmailProps) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch (err) {
      // Optionally, provide fallback feedback to the user
      alert(`Failed to copy email to clipboard. Please copy manually.`)
    } finally {
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <span
            className={`cursor-pointer font-bold text-keppel-800 hover:text-sunglow-400 hover:underline ${className}`}
            onClick={copyEmail}
          >
            {email}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="end"
          className="bg-sunglow-400 text-md text-black"
        >
          ✓ Copied!
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
