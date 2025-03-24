"use client"
import { XMarkIcon } from "@heroicons/react/20/solid"
import getOpenIssues from "@/components/header/ccv-status-utils"
import { useState } from "react"

interface BannerProps {
  variant?: string
  children: React.ReactNode
}

export default function Banner({
  variant = "primary",
  children,
  ...delegated
}: BannerProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {isOpen && (
        <div
          className={
            variant === "primary"
              ? "bg-teal-50 relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
              : "bg-university-red-100 relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
          }
        >
          {children}
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon
                aria-hidden="true"
                className={"text-white size-5"}
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
