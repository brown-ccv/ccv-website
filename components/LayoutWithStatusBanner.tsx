"use client";

import { usePathname } from "next/navigation";
import "@/app/globals.css";
import StatusBanner from "@/components/StatusBanner";
import { Button } from "@/components/ui/button";
import ExternalLink from "@/components/ui/external-link";

interface LayoutWithStatusBannerProps {
  issues: any[];
}

export default function LayoutWithStatusBanner({ issues }: LayoutWithStatusBannerProps) {
  const pathname = usePathname();
  const showStatusBanner = pathname === "/";
  const repoNames = issues.map((repo) => repo.name).join(", "); 
  const isOperational = issues.length === 0;

  return (
    <div>
      {showStatusBanner && (
        <StatusBanner isOperational={isOperational}>
          <div className="flex items-center justify-center gap-x-4 min-w-0 w-full">
            {issues.length > 0 ? (
              <>
                <p className="text-xs sm:text-sm md:text-lg">
                  <strong>Service Disruption:</strong> {repoNames}
                </p>
                <Button variant="secondary_filled" size="sm" className="text-xs sm:text-sm md:text-md w-auto">
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
                <p className="text-xs sm:text-sm md:text-lg whitespace-nowrap">
                  All Services Operational
                </p>
                <Button variant="secondary_filled" size="sm" className="text-xs sm:text-sm md:text-lg w-auto">
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
      )}
    </div>
  );
}
