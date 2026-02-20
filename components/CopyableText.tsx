"use client"

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  isValidElement,
  ReactElement,
} from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"

interface CopyableTextProps {
  children: ReactNode
  side?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function CopyableText({
  children,
  side = "right",
  className = "",
}: CopyableTextProps) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copyText = async () => {
    // Clear any existing timeout before scheduling a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Extract and normalize text content from children
    const text = extractTextFromChildren(children).trim()

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(false)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err)
      setError(true)
      setCopied(false)
      timeoutRef.current = setTimeout(() => setError(false), 2000)
    }
  }
  const textContent = extractTextFromChildren(children).trim()

  return (
    <TooltipProvider>
      <Tooltip open={copied || error}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={`cursor-pointer font-bold text-keppel-800 hover:text-sunglow-400 hover:underline ${className}`}
            onClick={copyText}
            aria-label={`Copy ${textContent} to clipboard`}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align="end"
          className={
            error
              ? "bg-red-500 text-md text-white"
              : "bg-sunglow-400 text-md text-black"
          }
        >
          {error ? "✗ Failed to copy" : "✓ Copied!"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Helper function to extract text from React children
function extractTextFromChildren(children: ReactNode): string {
  // Handle null, undefined, boolean
  if (children == null || typeof children === "boolean") {
    return ""
  }

  // Handle string and number
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }

  // Handle arrays
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("")
  }

  // Handle React elements
  if (isValidElement(children)) {
    const element = children as ReactElement<{ children?: ReactNode }>
    return extractTextFromChildren(element.props.children)
  }

  return ""
}
