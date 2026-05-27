"use client"

import { usePathname } from "next/navigation"
import { StatusBanner } from "@/components/StatusBanner"
import { ButtonLink } from "@/components/button/ButtonLink"

interface ConditionalStatusBannerProps {
  issues: any[]
}

export function ConditionalStatusBanner({
  issues,
}: ConditionalStatusBannerProps) {
  const pathname = usePathname()

  // Only show on home page
  if (pathname !== "/") {
    return null
  }
  console.log(issues)
  const openIssues = issues.filter((repo) => repo.openIssues.length > 0)
  return (
    <StatusBanner isOperational={openIssues.length === 0}>
      <div className="flex flex-row items-center justify-center gap-2 text-sm sm:gap-4">
        {openIssues.length > 0 ? (
          <>
            <p className="sm:text-md">
              <strong>Service Disruption:</strong>{" "}
              {issues.map((repo) => repo.name).join(", ")}
            </p>
            <ButtonLink
              href={"https://status.ccv.brown.edu/"}
              variant="unstyled"
              size="sm"
              className="bg-red-university text-white hover:bg-white hover:text-red-university"
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
            >
              View Status
            </ButtonLink>
          </>
        )}
      </div>
    </StatusBanner>
  )
}
