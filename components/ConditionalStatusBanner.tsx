"use client"

import { usePathname } from "next/navigation"
import StatusBanner from "@/components/StatusBanner"
import ButtonLink from "@/components/button/ButtonLink"

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
      <div className="flex flex-row items-center justify-center gap-2 text-sm sm:gap-4">
        {issues.length > 0 ? (
          <>
            <p className="sm:text-md">
              <strong>Service Disruption:</strong>{" "}
              {issues.map((repo) => repo.name).join(", ")}
            </p>
            <ButtonLink
              href={"https://status.ccv.brown.edu/"}
              variant="secondary_filled"
              size="sm"
              className="sm:text-md"
            >
              View Incidents
            </ButtonLink>
          </>
        ) : (
          <>
            <p className="text-center sm:text-left sm:text-lg">
              All Services Operational
            </p>
            <ButtonLink
              href={"https://status.ccv.brown.edu/"}
              variant="secondary_filled"
              size="sm"
              className="sm:text-lg"
            >
              View Status
            </ButtonLink>
          </>
        )}
      </div>
    </StatusBanner>
  )
}
