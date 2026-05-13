import React from "react"

interface ButtonGroupProps {
  children: React.ReactNode
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className="flex w-full flex-col flex-wrap sm:flex-row sm:items-center sm:space-x-2">
      {children}
    </div>
  )
}
