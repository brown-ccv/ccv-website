"use server"

import { Octokit } from "@octokit/rest"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import { filterPRs, getSecret, type GitHubIssue } from "./common"

export async function getClosedIssues({ repo }) {
  const secret = await getSecret()
  const org = "ccv-status"
  const octokit = new Octokit({ auth: secret })

  const closed = await octokit.request(
    `GET /repos/${org}/${repo}/issues?state=closed`,
    {
      org: { org },
      sort: "created",
      direction: "desc",
      per_page: 100,
    }
  )
  return await Promise.all(
    filterPRs(closed.data).map(async (issue) => {
      const comments = await octokit.request(`GET ${issue.comments_url}`, {
        org: { org },
        type: "private",
        sort: "created",
        direction: "desc",
      })

      return {
        ...issue,
        comments: comments.data.sort(
          (a, b) =>
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        ),
      }
    })
  )
}
