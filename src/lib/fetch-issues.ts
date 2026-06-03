"use server"

import { type GitHubIssue } from "@/types/issue-types"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import { Octokit } from "@octokit/rest"

type RepoPrivacy = "all" | "private" | "public"

async function getOrg() {
  let org = "ccv-status"
  let privacy: RepoPrivacy = "private"
  let secret = ""
  // fetch from public repo if in dev
  if (
    !process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_STATIC_EXPORT
  ) {
    org = "test-status"
    privacy = "public"
    secret = await getSecret()
  }
  return { org, privacy, secret }
}

function filterPRs(issues: GitHubIssue[]): GitHubIssue[] {
  return issues.filter((el) => !el.hasOwnProperty("pull_request"))
}

async function getSecret() {
  const client = new SecretManagerServiceClient()
  const [secret] = await client.accessSecretVersion({
    name: "projects/ccv-website-next/secrets/myGithubToken/versions/latest",
  })
  if (!secret.payload?.data) {
    throw new Error("Secret payload missing or empty.")
  }
  return secret.payload.data.toString()
}

export async function getClosedIssues(repo: string) {
  const { org, privacy, secret } = await getOrg()
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
        type: privacy,
        sort: "created",
        direction: "desc",
      })

      return {
        ...issue,
        comments: comments.data,
      }
    })
  )
}

export async function getOpenIssues() {
  const { org, privacy, secret } = await getOrg()
  const octokit = new Octokit({ auth: secret })

  const allRepos = await octokit.rest.repos.listForOrg({
    org,
    type: privacy,
  })

  const issuesData = await Promise.all(
    allRepos.data.map(async ({ name }: { name: string }) => {
      const open = await octokit.rest.issues.listForRepo({
        owner: org,
        repo: name,
        sort: "created",
        direction: "desc",
      })

      const openIssues = filterPRs(open.data as GitHubIssue[])
      return { name, openIssues }
    })
  )
  return issuesData
}
