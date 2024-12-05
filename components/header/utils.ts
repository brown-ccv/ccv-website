"use server"
import { Octokit } from "octokit"

function filterPRs(issues) {
  return issues.filter((el) => !el.hasOwnProperty("pull_request"))
}

// from @s-bessey via ccv-status repo
export default async function getOpenIssues() {
  const { SecretManagerServiceClient } = require("@google-cloud/secret-manager")
  const client = new SecretManagerServiceClient()

  async function getSecret() {
    const [secret] = await client.accessSecretVersion({
      name: "projects/ccv-status/secrets/myGithubToken/versions/latest",
    })

    return secret.payload.data.toString()
  }

  const secret = await getSecret()

  async function myFetch(url, options) {
    return await fetch(url, { ...options, cache: "no-cache" })
  }

  const org = "ccv-status"
  const octokit = new Octokit({
    auth: secret,
    request: { fetch: myFetch },
  })

  // Get all repos
  const allRepos = await octokit.request(`GET /orgs/${org}/repos`, {
    org: { org },
    type: "private",
  })

  return await Promise.all(
    allRepos.data.map(async ({ name }) => {
      const open = await octokit.request(`GET /repos/${org}/${name}/issues`, {
        org: { org },
        repo: { name },
        type: "private",
        sort: "created",
        direction: "desc",
      })

      // This currently only gets the last 100 comments on the repo. It should be changed
      // to get the comments per issue instead, which will be addressed in the next PR
      const comments = await octokit.request(
        `GET /repos/${org}/${name}/issues/comments`,
        {
          org: { org },
          repo: { name },
          sort: "created",
          direction: "desc",
          per_page: 100,
        }
      )

      const openIssues = filterPRs(open.data).map((issue) => ({
        ...issue,
        comments: comments.data.filter((el) => el.issue_url === issue.url),
      }))

      return {
        name,
        openIssues,
      }
    })
  )
}
