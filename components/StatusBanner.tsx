"use client"

import { XMarkIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function StatusBanner({ children, isOperational }: { children: React.ReactNode; isOperational?: boolean }) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div
      className={`relative isolate w-full flex items-center gap-x-6 overflow-hidden px-4 py-2.5 sm:px-3.5 sm:before:flex-1 
      ${isOperational ? "bg-keppel-500 text-black" : "bg-red-university text-white"}`}
    >
      {children}
      <div className="flex flex-1 justify-end">
      <Button
        variant="icon_only"
        size="icon"
        aria-label="Dismiss banner"
        onClick={() => setIsOpen(false)}
        className="
          bg-transparent
          hover:bg-white
          hover:text-black
          active:bg-neutral-50
        "
        iconOnly={
          <XMarkIcon aria-hidden="true" className="h-5 w-5" />
        }
      />
      </div>
    </div>
  )
}
