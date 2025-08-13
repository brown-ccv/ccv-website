import React, { useState } from "react"
import { IconButton } from "@/components/button/IconButton"

interface StatusBannerProps {
  children: React.ReactNode
  isOperational?: boolean
  id?: string
  className?: string
}

export default function StatusBanner({
  children,
  isOperational,
}: StatusBannerProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div
      className={`relative isolate w-full flex items-center justify-between gap-x-1 sm:gap-x-4 md:gap-x-6 overflow-hidden h-[55px] px-4 sm:px-6 md:px-8 
      ${isOperational ? "bg-keppel-500 text-black" : "bg-red-university text-white"}`}
    >
      <div className="flex-1 min-w-0 pr-2 sm:pr-4">{children}</div>
      <IconButton
        iconName="FaTimes"
        aria-label="Dismiss banner"
        onClick={() => setIsOpen(false)}
      />
    </div>
  )
}
