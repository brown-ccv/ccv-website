import React from "react"

import priorityStatus from "@/lib/status/priorityStatus"
import { type GitHubIssue } from "@/types/issue-types"

interface GridProps {
  name: string
  openIssues: GitHubIssue[]
}

// from https://tailwindui.com/components/application-ui/lists/grid-lists

export default async function IssueGrid({ issues }: { issues: GridProps[] }) {
  // const borderStyle = {border: `1px solid ${priorityStatus(repo.openIssues)?.color}`, }
  return (
    <ul
      role="list"
      className="mx-auto my-4 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8"
    >
      {Object.values(issues).map((repo) => (
        <li
          key={repo.name}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex h-4/6 w-full items-start justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-start space-x-3">
                <h2
                  className="inline-flex flex-shrink-0 truncate text-lg font-medium"
                  style={{ lineHeight: "1.25rem" }}
                >
                  {repo.name}
                </h2>
                <a
                  href={
                    repo.openIssues.length !== 0 ? `#${repo.name}` : undefined
                  }
                  style={{
                    border: `2px solid ${priorityStatus(repo.openIssues)?.color}`,
                  }}
                  className={`${repo.openIssues.length === 0 ? "disabled" : "hover:text-gray-600"} inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs text-black no-underline`}
                >
                  {priorityStatus(repo.openIssues)?.name}
                </a>
              </div>
              <p className="mt-1 truncate text-gray-500">
                {priorityStatus(repo.openIssues)?.title}{" "}
                {repo.openIssues.length > 1
                  ? `+${repo.openIssues.length - 1} more`
                  : ""}
              </p>
            </div>
            <span
              style={{
                backgroundColor: priorityStatus(repo.openIssues)?.color,
                color: priorityStatus(repo.openIssues)?.color,
              }}
              className="pulse h-4 w-4 flex-shrink-0 rounded-full"
            />
          </div>
          <div className="flex h-2/6 divide-x divide-gray-200">
            <a
              href={repo.openIssues.length !== 0 ? `#${repo.name}` : undefined}
              className={`${repo.openIssues.length === 0 && "button-disabled"} -mr-px flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-xs font-semibold hover:bg-gray-100`}
              aria-disabled={repo.openIssues.length === 0}
            >
              Current Incidents
            </a>
            <a
              href={`/history/${repo.name}`}
              className={
                "-mr-px flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-xs font-semibold hover:bg-gray-100"
              }
            >
              Past Incidents
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
