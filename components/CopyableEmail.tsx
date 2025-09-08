"use client"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"

interface CopyableEmailProps {
  email: string
  className?: string
}

export const CopyableEmail = ({ email, className = "" }: CopyableEmailProps) => {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <span 
            className={`cursor-pointer hover:underline hover:text-sunglow-400 ${className}`}
            onClick={copyEmail}
          >
            {email}
          </span>
        </TooltipTrigger>
        <TooltipContent side="right" align="end" className="bg-sunglow-400 text-black text-md">
          ✓ Copied!
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
