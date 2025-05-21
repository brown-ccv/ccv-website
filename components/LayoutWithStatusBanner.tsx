"use client";

import { usePathname } from "next/navigation";
import "@/app/globals.css";
import StatusBanner from "@/components/StatusBanner";
import { Button } from "@/components/ui/button";

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
          <div className="flex flex-wrap items-center gap-x-4">
            {issues.length > 0 ? (
              <>
                <p className="text-lg">
                  <strong>Service Disruption:</strong> {repoNames}
                </p>
                <Button variant="secondary_filled" size="sm" className="text-md">
                  <a
                    href="https://status.ccv.brown.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Incidents
                  </a>
                </Button>
              </>
            ) : (
              <>
                <p className="text-lg">
                  All Services Operational
                </p>
                <Button variant="secondary_filled" size="sm" className="text-lg">
                  <a
                    href="https://status.ccv.brown.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Status
                  </a>
                </Button>
              </>
            )}
          </div>
        </StatusBanner>
      )}
    </div>
  );
}
