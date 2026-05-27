"use server"

import { Octokit } from "@octokit/rest"
import { filterPRs, getSecret } from "./common"

export async function getOpenIssues() {
  const secret = await getSecret()
  const org = "ccv-status"
  const octokit = new Octokit({ auth: secret })
  const allRepos = await octokit.rest.repos.listForOrg({
    org,
    type: "private",
  })

  const issuesData = await Promise.all(
    allRepos.data.map(async ({ name }: { name: string }) => {
      const open = await octokit.rest.issues.listForRepo({
        owner: org,
        repo: name,
        sort: "created",
        direction: "desc",
      })

      const openIssues = filterPRs(open.data)

      return { name, openIssues }
    })
  )

  return issuesData.filter((repo) => repo.openIssues.length > 0)
}
