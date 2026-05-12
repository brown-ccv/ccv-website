import React from "react"

interface ButtonGroupProps {
  children: React.ReactNode
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className="flex w-full flex-col flex-wrap items-center gap-4 sm:flex-row">
      {children}
    </div>
  )
}
