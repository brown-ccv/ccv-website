"use client"

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  isValidElement,
  ReactElement,
  useMemo,
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
  const [errorMessage, setErrorMessage] = useState("Failed to copy")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Compute text content once and memoize it
  const textContent = useMemo(
    () => extractTextFromChildren(children).trim(),
    [children]
  )

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

    // Check if clipboard API is available
    if (!navigator.clipboard) {
      console.error("Clipboard API not available")
      setErrorMessage("Clipboard not available")
      setError(true)
      setCopied(false)
      timeoutRef.current = setTimeout(() => setError(false), 2000)
      return
    }

    try {
      await navigator.clipboard.writeText(textContent)
      setCopied(true)
      setError(false)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err)
      setErrorMessage("Failed to copy")
      setError(true)
      setCopied(false)
      timeoutRef.current = setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip open={copied || error}>
        <TooltipTrigger asChild>
          <button
            className={`focus-visible:ring-ring inline cursor-pointer rounded-md border-0 bg-transparent p-0 text-start font-bold text-keppel-800 hover:underline focus:outline-none focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400 ${className}`}
            onClick={copyText}
            aria-label="Copy to clipboard"
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align="end"
          className={
            error
              ? "bg-red-university text-md text-white"
              : "bg-sunglow-400 text-md text-black"
          }
        >
          {error ? `✗ ${errorMessage}` : "✓ Copied!"}
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
