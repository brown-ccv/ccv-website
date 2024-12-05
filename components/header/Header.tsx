import Banner from "@/components/header/Banner"
import Navbar from "@/components/header/Navbar"
import getOpenIssues from "@/components/header/utils"

export default async function Header() {
  const repositories = await getOpenIssues()
  // uncomment to test banner with no open issues
  const issues = []

  // comment out to test banner with no open issues
  // const issues = repositories.filter(
  //   (repository) => repository.openIssues.length > 0
  // )
  const repoNames = issues.map((repo) => repo.name).join(", ")
  return (
    <>
      {issues.length > 0 ? (
        <Banner variant="Service Disruption">
          {repoNames && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-sm/6 text-white">
                <strong className="font-semibold">CCV Services Status</strong>
                <svg
                  viewBox="0 0 2 2"
                  aria-hidden="true"
                  className="mx-2 inline size-0.5 fill-current"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                Service Disruption: {repoNames}
              </p>

              <a
                href="https://status.ccv.brown.edu/"
                target="_blank"
                className="flex-none rounded-md bg-[#991b1b] px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              >
                View Issues
              </a>
            </div>
          )}
        </Banner>
      ) : (
        <Banner>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm/6 text-gray-900">
              <strong className="font-semibold">CCV Services Status</strong>
              <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="mx-2 inline size-0.5 fill-current"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              All Services Operational
            </p>

            <a
              href="https://status.ccv.brown.edu/"
              target="_blank"
              className="flex-none rounded-md bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              View Issues
            </a>
          </div>
        </Banner>
      )}
      <Navbar />
    </>
  )
}
