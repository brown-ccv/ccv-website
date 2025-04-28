// utils.ts
import { Octokit } from "octokit";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

function filterPRs(issues) {
  return issues.filter((el) => !el.hasOwnProperty("pull_request"));
}

export async function getOpenIssues() {
  const client = new SecretManagerServiceClient();
  const [secret] = await client.accessSecretVersion({
    name: "projects/ccv-website-next/secrets/myGithubToken/versions/latest",
  });
  const token = secret.payload.data.toString();

  const octokit = new Octokit({ auth: token });
  const org = "ccv-status";
  const repos = await octokit.request(`GET /orgs/${org}/repos`, { org: { org }, type: "private" });

  return await Promise.all(
    repos.data.map(async ({ name }) => {
      const open = await octokit.request(`GET /repos/${org}/${name}/issues`, {
        org: { org },
        repo: { name },
        sort: "created",
        direction: "desc",
      });
      return { name, openIssues: filterPRs(open.data) };
    })
  );
}
