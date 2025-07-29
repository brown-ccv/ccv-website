"use server";

import { Octokit } from "octokit";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
interface GitHubIssue {
  id: number;
  title: string;
  pull_request?: any;
  [key: string]: any;
}

function filterPRs(issues: GitHubIssue[]): GitHubIssue[] {
  return issues.filter((el) => !el.hasOwnProperty("pull_request"));
}

async function getSecret() {
  const client = new SecretManagerServiceClient();
  const [secret] = await client.accessSecretVersion({
    name: "projects/ccv-website-next/secrets/myGithubToken/versions/latest",
  });

  if (!secret.payload?.data) {
    throw new Error("Secret payload missing or empty.");
  }

  return secret.payload.data.toString();
}

export async function getOpenIssues() {
  const secret = await getSecret();
  const org = "ccv-status";
  const octokit = new Octokit({ auth: secret });

  const allRepos = await octokit.request(`GET /orgs/${org}/repos`, {
    org: { org },
    type: "private",
  });

  const issuesData = await Promise.all(
    allRepos.data.map(async ({ name }: { name: string }) => {
      const open = await octokit.request(`GET /repos/${org}/${name}/issues`, {
        org: { org },
        repo: { name },
        sort: "created",
        direction: "desc",
      });

      const openIssues = filterPRs(open.data as GitHubIssue[]);

      return {
        name,
        openIssues,
      };
    })
  );

  return issuesData.filter((repo) => repo.openIssues.length > 0);
}
