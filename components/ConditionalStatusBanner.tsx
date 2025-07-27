"use client"

import { usePathname } from "next/navigation";
import StatusBanner from "@/components/StatusBanner";
import { Button } from "@/components/ui/button";
import ExternalLink from "@/components/ui/external-link";

interface ConditionalStatusBannerProps {
  issues: any[];
}

export default function ConditionalStatusBanner({ issues }: ConditionalStatusBannerProps) {
  const pathname = usePathname();
  
  // Only show on home page
  if (pathname !== "/") {
    return null;
  }

  return (
    <StatusBanner isOperational={issues.length === 0}>
      <div className="flex flex-wrap items-center gap-x-4">
        {issues.length > 0 ? (
          <>
            <p className="text-lg">
              <strong>Service Disruption:</strong> {issues.map((repo) => repo.name).join(", ")}
            </p>
            <Button variant="secondary_filled" size="sm" className="text-md">
              <ExternalLink
                href="https://status.ccv.brown.edu/"
                external={true}
              >
                View Incidents
              </ExternalLink>
            </Button>
          </>
        ) : (
          <>
            <p className="text-lg">
              All Services Operational
            </p>
            <Button variant="secondary_filled" size="sm" className="text-lg">
              <ExternalLink
                href="https://status.ccv.brown.edu/"
                external={true}
              >
                View Status
              </ExternalLink>
            </Button>
          </>
        )}
      </div>
    </StatusBanner>
  );
} 