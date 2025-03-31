import StatusBanner from "@/components/header/StatusBanner";
import BrownBanner from "@/components/header/BrownBanner";
// import Navbar from "@/components/header/Navbar";
import getOpenIssues from "@/components/header/utils";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const repositories = await getOpenIssues();
  const issues = repositories.filter((repo) => repo.openIssues.length > 0);
  const repoNames = issues.map((repo) => repo.name).join(", ");

  return (
    <>
      {issues.length > 0 ? (
        <StatusBanner>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-base text-white">
              <strong>Service Disruption:</strong> {repoNames}
            </p>
            <Button 
              variant="filled_secondary" 
              size="sm"
            >
              <a 
                href="https://status.ccv.brown.edu/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Incidents
              </a>
            </Button>
          </div>
        </StatusBanner>
      ) : (
        <StatusBanner className="bg-primary-500 bg-opacity-50">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-base text-gray-900">All Services Operational</p>
            <Button 
              variant="filled_secondary" 
              size="sm"
            >
              <a 
                href="https://status.ccv.brown.edu/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Status
              </a>
            </Button>
          </div>
        </StatusBanner>
      )}
      <BrownBanner />
      {/* <Navbar /> */}
    </>
  );
}
