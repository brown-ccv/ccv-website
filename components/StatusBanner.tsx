"use client"

import { XMarkIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface StatusBannerProps {
  children: React.ReactNode;
  isOperational?: boolean;
  id?: string;
  className?: string;
}

export default function StatusBanner({ children, isOperational }: StatusBannerProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <div

      className={`relative isolate w-full flex items-center justify-between gap-x-1 sm:gap-x-4 md:gap-x-6 overflow-hidden h-[55px] px-4 sm:px-6 md:px-8 
      ${isOperational ? "bg-keppel-500 text-black" : "bg-red-university text-white"}`}
    >
      <div className="flex-1 min-w-0 pr-2 sm:pr-4">
        {children}
      </div>
      <div className="flex-shrink-0">
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
            w-8 h-8
            sm:w-10 sm:h-10
          "
          iconOnly={
            <XMarkIcon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
          }
        />
      </div>
    </div>
  )
}
