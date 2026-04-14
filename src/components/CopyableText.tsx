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
import { Copy, Check } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { cn } from "@/lib/utils"

interface CopyableTextProps {
  children: ReactNode
  side?: "top" | "bottom" | "left" | "right"
  className?: string
  variant?: "inline" | "code"
}

export function CopyableText({
  children,
  side = "right",
  className = "",
  variant = "inline",
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

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

  if (variant === "inline") {
    return (
      <TooltipProvider>
        <Tooltip open={copied || error}>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "focus-visible:ring-ring inline cursor-pointer rounded-md border-0 bg-transparent p-0 text-start font-bold text-keppel-800 hover:underline focus:outline-none focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400",
                className
              )}
              onClick={copyText}
              aria-label="Copy to clipboard"
            >
              {children}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side={side}
            align="center"
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

  return (
    <div
      className={cn(
        "relative flex items-center justify-between rounded-md bg-slate-100 px-4 py-3 text-sm",
        className
      )}
    >
      <span className="flex-1 overflow-x-auto">{children}</span>
      <TooltipProvider>
        <Tooltip open={copied || error}>
          <TooltipTrigger asChild>
            <button
              onClick={copyText}
              className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-800 transition-colors hover:bg-slate-800 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400"
              aria-label="Copy text"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className={
              error
                ? "bg-red-university text-xs text-white"
                : "bg-sunglow-400 text-xs text-black"
            }
          >
            {error ? errorMessage : "Copied!"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

// Helper function to extract text from React children
function extractTextFromChildren(children: ReactNode): string {
  const textAccumulator: string[] = []

  const traverse = (node: ReactNode) => {
    // 1. Handle primitives (null, undefined, boolean) - skip them
    if (
      node === null ||
      typeof node === "boolean" ||
      typeof node === "undefined"
    ) {
      return
    }

    // 2. Handle simple text (string, number)
    if (typeof node === "string" || typeof node === "number") {
      textAccumulator.push(String(node))
      return
    }

    // 3. Handle Arrays (recursion)
    if (Array.isArray(node)) {
      for (const child of node) {
        traverse(child)
      }
      return
    }

    // 4. Handle React Elements (recursion into children)
    if (isValidElement(node)) {
      const element = node as ReactElement<{ children?: ReactNode }>
      traverse(element.props.children)
    }
  }

  traverse(children)

  return textAccumulator.join("")
}
