import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

export interface GitHubIssue {
  id: number
  title: string
  pull_request?: any

  [key: string]: any
}

export function filterPRs(issues: GitHubIssue[]): GitHubIssue[] {
  return issues.filter((el) => !el.hasOwnProperty("pull_request"))
}

export async function getSecret() {
  const client = new SecretManagerServiceClient()
  const [secret] = await client.accessSecretVersion({
    name: "projects/ccv-website-next/secrets/myGithubToken/versions/latest",
  })
  if (!secret.payload?.data) {
    throw new Error("Secret payload missing or empty.")
  }
  return secret.payload.data.toString()
}
