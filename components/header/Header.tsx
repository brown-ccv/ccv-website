import Banner from "@/components/header/Banner"
import Navbar from "@/components/header/Navbar"
import getOpenIssues from "@/components/header/utils"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export default async function Header() {
  const repositories = await getOpenIssues()

  const issues = repositories.filter(
    (repository) => repository.openIssues.length > 0
  )
  const repoNames = issues.map((repo) => repo.name).join(", ")
  return (
    <>
      {issues.length > 0 ? (
        <Banner variant="Service Disruption">
          {repoNames && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-base text-gray-900">
                <strong>Service Disruption:</strong> {repoNames}
              </p>

              <a
                href="https://status.ccv.brown.edu/"
                target="_blank"
                className="flex-none rounded-md bg-[#991b1b] px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                View Incidents
              </a>
            </div>
          )}
        </Banner>
      ) : (
        <Banner>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-base text-gray-900">All Services Operational</p>

            <a
              href="https://status.ccv.brown.edu/"
              target="_blank"
              className="flex-none rounded-md bg-secondary-blue-700 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              View Status
            </a>
          </div>
        </Banner>
      )}
      <Navbar />
    </>
  )
}
