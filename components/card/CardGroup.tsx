import React from "react"
import { cn } from "@/lib/utils"

interface CardGroupProps {
  children: React.ReactNode
  align?: "center" | "left"
}

export function CardGroup({ children, align = "center" }: CardGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-6 sm:p-4",
        align === "center" ? "justify-center" : "justify-start"
      )}
    >
      {children}
    </div>
  )
}
