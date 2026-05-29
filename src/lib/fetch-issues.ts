"use server"

import { type GitHubIssue } from "@/types/issue-types"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"
import { Octokit } from "@octokit/rest"

type RepoPrivacy = "all" | "private" | "public"

function getRepo() {
  let org = "ccv-status"
  let privacy: RepoPrivacy = "private"
  // fetch from public repo if in dev
  if (!process.env.SITE_URL || process.env.NEXT_PUBLIC_STATIC_EXPORT) {
    org = "test-status"
    privacy = "public"
  }
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
  const secret = await getSecret()
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
  const secret = await getSecret()
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

export async function getIssueComments(issues: GitHubIssue[], repo: string) {
  const secret = await getSecret()
  const octokit = new Octokit({ auth: secret })
  const issuesWithComment = await Promise.all(
    issues.map(async (issue) => {
      const comments = await octokit.rest.issues.listComments({
        owner: org,
        repo,
        issue_number: issue.number,
      })
      const commentData = comments.data
      return { repo, issue, commentData }
    })
  )
  return issuesWithComment
}
