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
      name: "projects/ccv-website-next/secrets/myGithubToken/versions/latest",
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

      const openIssues = filterPRs(open.data)

      return {
        name,
        openIssues,
      }
    })
  )
}
