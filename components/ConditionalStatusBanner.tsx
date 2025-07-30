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
      <div className="flex flex-wrap items-center gap-x-4">
        {issues.length > 0 ? (
          <>
            <p className="text-lg">
              <strong>Service Disruption:</strong>{" "}
              {issues.map((repo) => repo.name).join(", ")}
            </p>
            <ButtonLink
              href={"https://status.ccv.brown.edu/"}
              external
              variant="secondary_filled"
              size="sm"
              className="text-md"
            >
              View Incidents
            </ButtonLink>
          </>
        ) : (
          <>
            <p className="text-lg">All Services Operational</p>
            <ButtonLink
              href={"https://status.ccv.brown.edu/"}
              external
              variant="secondary_filled"
              size="sm"
              className="text-lg"
            >
              View Status
            </ButtonLink>
          </>
        )}
      </div>
    </StatusBanner>
  )
}
