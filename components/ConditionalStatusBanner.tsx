"use client"

import { usePathname } from "next/navigation"
import StatusBanner from "@/components/StatusBanner"
import ButtonLink from "@/components/ui/ButtonLink"

interface ConditionalStatusBannerProps {
  issues: any[]
}

export default function ConditionalStatusBanner({
  issues,
}: ConditionalStatusBannerProps) {
  const pathname = usePathname()

  // Only show on home page
  if (pathname !== "/") {
    return null
  }

  return (
    <StatusBanner isOperational={issues.length === 0}>
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
        {issues.length > 0 ? (
          <>
            <p className="text-sm sm:text-md w-auto flex-shrink-0">
              <strong>Service Disruption:</strong>{" "}
              {issues.map((repo) => repo.name).join(", ")}
            </p>
            <ButtonLink
              href={"https://status.ccv.brown.edu/"}
              external
              variant="secondary_filled"
              size="sm"
              className="text-sm sm:text-md w-auto flex-shrink-0"
            >
              View Incidents
            </ButtonLink>
          </>
        ) : (
          <>
            <p className="text-sm sm:text-lg text-center sm:text-left flex-shrink">
              All Services Operational
            </p>
            <ButtonLink
              href={"https://status.ccv.brown.edu/"}
              external
              variant="secondary_filled"
              size="sm"
              className="text-sm sm:text-lg w-auto flex-shrink-0"
            >
              View Status
            </ButtonLink>
          </>
        )}
      </div>
    </StatusBanner>
  )
}
