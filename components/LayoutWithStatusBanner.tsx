"use client";

import { usePathname } from "next/navigation";
import "@/app/globals.css";
import StatusBanner from "@/components/header/StatusBanner";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Navbar from "@/components/header/Navbar";
import { Button } from "@/components/ui/button";

interface LayoutWithStatusBannerProps {
  children: React.ReactNode;
  issues: any[];
}

export default function LayoutWithStatusBanner({
  children,
  issues,
}: LayoutWithStatusBannerProps) {
  const pathname = usePathname();
  const showStatusBanner = pathname === "/";
  const repoNames = issues.map((repo) => repo.name).join(", ");

  return (
    <div className="min-h-screen bg-white" style={{ zoom: 0.93 }}>
      {showStatusBanner && (
        <StatusBanner>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {issues.length > 0 ? (
              <>
                <p className="text-xl text-white">
                  <strong>Service Disruption:</strong> {repoNames}
                </p>
                <Button variant="secondary_filled" size="md">
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
                <p className="text-base text-gray-900">
                  All Services Operational
                </p>
                <Button variant="secondary_filled" size="sm">
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
      <Header />
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
