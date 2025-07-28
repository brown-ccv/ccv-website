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
  const isOperational = issues.length === 0;
  
  const statusConfig = isOperational 
    ? {
        message: "All Services Operational",
        buttonText: "View Status",
        textClass: "text-xs sm:text-sm md:text-lg"
      }
    : {
        message: `Service Disruption: ${issues.map((repo) => repo.name).join(", ")}`,
        buttonText: "View Incidents", 
        textClass: "text-xs sm:text-sm md:text-md"
      };

  if (!showStatusBanner) return null;

  return (
    <StatusBanner isOperational={isOperational}>
      <div className="flex items-center justify-center gap-x-4 min-w-0 w-full">
        <p className={`${statusConfig.textClass} ${isOperational ? 'whitespace-nowrap' : ''}`}>
          {isOperational ? statusConfig.message : <strong>{statusConfig.message}</strong>}
        </p>
        <Button 
          variant="secondary_filled" 
          size="sm" 
          className={`${statusConfig.textClass} w-auto`}
        >
          <ExternalLink href="https://status.ccv.brown.edu/" external={true}>
            {statusConfig.buttonText}
          </ExternalLink>
        </Button>
      </div>
    </StatusBanner>
  );
}
