import React from "react"

// Uses https://tailwindui.com/components/application-ui/layout/containers#component-fa14d2deae17e4c14964ef86ea0a1603
//

import ListContainer from "./ListContainer"

export default function ActiveIssues({ issues }) {
  console.log(issues)
  return (
    <>
      {issues.map((repo) => (
        <div key={repo.name}>
          {repo.openIssues.length != 0 && (
            <div className="mx-auto my-4 max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2
                id={repo.name}
                className="my-4 text-3xl font-bold tracking-tight text-gray-900"
              >
                {repo.name}
              </h2>
              <ListContainer issues={repo.openIssues} />
            </div>
          )}
        </div>
      ))}
    </>
  )
}
