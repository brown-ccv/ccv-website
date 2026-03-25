import { Octokit } from "octokit"
import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

interface DocumentationPage {
  slug: string
  content: string
}

interface DocConfig {
  ignore: {
    files: string[]
    folders: string[]
  }
  include: {
    name: string
    slug: string
  }[]
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

function removeFrontmatter(markdown: string): string {
  return markdown.replace(/^---[\s\S]*?---\n/, "")
}

function buildSlug(folderSlug: string, filePath: string): string {
  const BASE_URL = "https://docs.ccv.brown.edu"

  // README.md is the index page, so it maps to the folder's root url
  if (filePath === "README.md") {
    return `${BASE_URL}/${folderSlug}`
  }

  // Remove .md extension and build the full url
  const fileName = filePath.replace(/\.md$/, "")
  return `${BASE_URL}/${folderSlug}/${fileName}`
}

async function getDocumentationData() {
  const secret = await getSecret()
  const octokit = new Octokit({ auth: secret })

  const docConfig = await octokit.request(
    `GET /repos/{owner}/{repo}/contents/{path}`,
    {
      owner: "brown-ccv",
      repo: "ccv-documentation",
      path: "searchConfig.json",
      headers: {
        "X-GitHub-Api-Version": "2026-03-10",
      },
    }
  )

  const data = docConfig.data

  if (Array.isArray(data) || !("content" in data)) {
    throw new Error("Unexpected response format from GitHub API")
  }

  const content = JSON.parse(
    Buffer.from(data.content, "base64").toString("utf-8")
  ) as DocConfig

  const folders = content.include.map((item) => item.slug)
  const ignoredFiles = content.ignore.files
  const ignoredFolders = content.ignore.folders

  return { folders, ignoredFiles, ignoredFolders }
}

async function fetchMarkdownFiles(
  octokit: Octokit,
  owner: string,
  repo: string,
  repoPath: string,
  folderSlug: string,
  ignoredFiles: string[],
  ignoredFolders: string[]
): Promise<DocumentationPage[]> {
  const pages: DocumentationPage[] = []

  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner,
      repo,
      path: repoPath,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )

  const data = response.data

  if (!Array.isArray(data)) {
    throw new Error(`Expected directory listing at path: ${repoPath}`)
  }

  for (const item of data) {
    // Handle markdown files
    if (item.type === "file" && item.name.endsWith(".md")) {
      if (ignoredFiles.includes(item.name)) continue

      const fileResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path: item.path,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      )

      const fileData = fileResponse.data

      if (Array.isArray(fileData) || !("content" in fileData)) {
        throw new Error(`Unexpected response format for file: ${item.path}`)
      }

      const rawContent = Buffer.from(fileData.content, "base64").toString(
        "utf-8"
      )
      const content = removeFrontmatter(rawContent)
      const slug = buildSlug(folderSlug, item.name)

      pages.push({ slug, content })
    }

    // Recursively handle subdirectories
    if (item.type === "dir") {
      if (ignoredFolders.includes(item.name)) continue

      const subfolderSlug = `${folderSlug}/${item.name}`
      const subPages = await fetchMarkdownFiles(
        octokit,
        owner,
        repo,
        item.path,
        subfolderSlug,
        ignoredFiles,
        ignoredFolders
      )

      pages.push(...subPages)
    }
  }

  return pages
}

export async function getMarkdownContent(
  folders: string[],
  ignoredFiles: string[],
  ignoredFolders: string[]
): Promise<DocumentationPage[]> {
  const secret = await getSecret()
  const octokit = new Octokit({ auth: secret })

  const allPages: DocumentationPage[] = []

  for (const folderSlug of folders) {
    const pages = await fetchMarkdownFiles(
      octokit,
      "brown-ccv",
      "ccv-documentation",
      folderSlug, // repo path matches the slug (e.g. "hibernate")
      folderSlug, // base url slug also starts from the folder slug
      ignoredFiles,
      ignoredFolders
    )

    allPages.push(...pages)
  }

  return allPages
}
