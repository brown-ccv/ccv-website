"use client";

import "@/app/globals.css";
import StatusBanner from "@/components/StatusBanner";
import { Button } from "@/components/ui/button";
import ExternalLink from "@/components/ui/external-link";

interface LayoutWithStatusBannerProps {
  issues: any[];
}

export default function LayoutWithStatusBanner({ issues }: LayoutWithStatusBannerProps) {
  const repoNames = issues.map((repo) => repo.name).join(", "); 
  const isOperational = issues.length === 0;

  return (
    <div>
      <StatusBanner isOperational={isOperational}>
          <div className="flex flex-wrap items-center gap-x-4">
            {issues.length > 0 ? (
              <>
                <p className="text-lg">
                  <strong>Service Disruption:</strong> {repoNames}
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
    </div>
  );
}
