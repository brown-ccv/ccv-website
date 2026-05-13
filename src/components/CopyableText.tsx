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
import { cn } from "@/utils/helper"
import { FaCopy, FaCheck } from "react-icons/fa"
import { Button } from "@/components/button/Button"

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
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
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
          <span className={cn("inline-flex items-center gap-2", className)}>
            <span className="text-start font-bold text-keppel-800">
              {children}
            </span>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="mb-2 mr-2 h-6 w-6 text-xs"
                onClick={copyText}
                aria-label="Copy text to clipboard"
              >
                {copied ? <FaCheck /> : <FaCopy />}
              </Button>
            </TooltipTrigger>
          </span>
          <TooltipContent
            side={side}
            align="center"
            className={
              error
                ? "bg-red-university text-md text-white"
                : "bg-sunglow-400 text-md text-black"
            }
          >
            {error ? `${errorMessage}` : "Copied to clipboard"}
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
            <Button
              size="icon"
              className="h-6 w-6 text-xs"
              onClick={copyText}
              aria-label="Copy text to clipboard"
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className={
              error
                ? "bg-red-university text-xs text-white"
                : "bg-sunglow-400 text-xs text-black"
            }
          >
            {error ? `${errorMessage}` : "Copied to clipboard"}
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
    if (
      node === null ||
      typeof node === "boolean" ||
      typeof node === "undefined"
    ) {
      return
    }

    if (typeof node === "string" || typeof node === "number") {
      textAccumulator.push(String(node))
      return
    }

    if (Array.isArray(node)) {
      for (const child of node) {
        traverse(child)
      }
      return
    }

    if (isValidElement(node)) {
      const element = node as ReactElement<{ children?: ReactNode }>
      traverse(element.props.children)
    }
  }

  traverse(children)

  return textAccumulator.join("")
}
