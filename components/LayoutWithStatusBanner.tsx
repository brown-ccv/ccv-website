"use client"

import { usePathname } from "next/navigation"
import "@/app/globals.css"
import StatusBanner from "@/components/StatusBanner"
import ButtonLink from "@/components/ui/button-link"

interface LayoutWithStatusBannerProps {
  issues: any[]
}

export default function LayoutWithStatusBanner({
  issues,
}: LayoutWithStatusBannerProps) {
  const pathname = usePathname()
  const showStatusBanner = pathname === "/"
  const repoNames = issues.map((repo) => repo.name).join(", ")
  const isOperational = issues.length === 0

  return (
    <div>
      {showStatusBanner && (
        <StatusBanner isOperational={isOperational}>
          <div className="flex flex-wrap items-center gap-x-4">
            {issues.length > 0 ? (
              <>
                <p className="text-lg">
                  <strong>Service Disruption:</strong> {repoNames}
                </p>
                <ButtonLink
                  href="https://status.ccv.brown.edu/"
                  external={true}
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
                  href="https://status.ccv.brown.edu/"
                  external={true}
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
      )}
    </div>
  )
}
