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
      className={`flex w-full items-center justify-between gap-x-1 overflow-hidden px-4 py-1 sm:gap-x-4 sm:px-6 md:gap-x-6 md:px-8 ${isOperational ? "bg-keppel-500 text-black" : "bg-red-university text-white"}`}
    >
      <div className="min-w-0 flex-1 pr-2 sm:pr-4">{children}</div>
      <IconButton
        iconName="FaTimes"
        aria-label="Dismiss banner"
        onClick={() => setIsOpen(false)}
      />
    </div>
  )
}
