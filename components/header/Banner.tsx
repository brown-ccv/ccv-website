"use client"
import { XMarkIcon } from "@heroicons/react/20/solid"
import getOpenIssues from "@/components/header/utils"
import { useState } from "react"

interface BannerProps {
  variant: string
}

// Try red/orange for the error gradient

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
              : "border-t-4 border-[#991b1b] bg-rose-50 relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
          }
        >
          <div
            aria-hidden="true"
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
              className={
                variant === "primary"
                  ? "aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primary-700 to-secondary-blue-500 opacity-30"
                  : "aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#fc0720] to-[#ff6700] opacity-30"
              }
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
              className={
                variant === "primary"
                  ? "aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primary-700 to-secondary-blue-500 opacity-30"
                  : "aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#fc0720] to-[#ff6700] opacity-30"
              }
            />
          </div>
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
                className={"text-gray-900 size-5"}
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
