import React from "react"
import ActiveIssues from "@/components/status/ActiveIssues"
import IssueGrid from "@/components/status/IssueGrid"
import { getOpenIssues } from "@/lib/fetch-issues"
import "./status.css"

let getCachedOpenIssues: () => Promise<any[]>
if (!process.env.NEXT_PUBLIC_STATIC_EXPORT) {
  const { getOpenIssues } = require("@/lib/fetch-issues")
  const { unstable_cache } = require("next/cache")
  getCachedOpenIssues = unstable_cache(getOpenIssues, ["open-issues"], {
    revalidate: 60,
  })
} else {
  getCachedOpenIssues = async () => []
}

export default async function ActiveStatus() {
  let issues = []
  try {
    issues = await getCachedOpenIssues()
  } catch (error) {
    console.error("Failed to fetch GitHub issues:", error)
  }

  return (
    <>
      <IssueGrid issues={issues} />
    </>
  )
}
