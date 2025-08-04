import React from "react"
import { cn } from "@/lib/utils"

interface CardGroupProps {
  children: React.ReactNode
  align?: "center" | "left"
}

export const CardGroup: React.FC<CardGroupProps> = ({
  children,
  align = "center",
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-y-6 gap-x-6",
        align === "center" ? "justify-center" : "justify-start"
      )}
    >
      {children}
    </div>
  )
}
