import React from "react"
import IssueGrid from "@/components/status/IssueGrid"
import "./status.css"

const { getOpenIssues } = require("@/lib/fetch-issues")
const { unstable_cache } = require("next/cache")
const getCachedOpenIssues = unstable_cache(getOpenIssues, ["open-issues"], {
  revalidate: 60,
})

export default async function ActiveStatus() {
  // let issues = []
  // try {
  //   issues = await getCachedOpenIssues()
  // } catch (error) {
  //   console.error("Failed to fetch GitHub issues:", error)
  // }
  const issues = await getOpenIssues()
  return (
    <>
      <IssueGrid issues={issues} />
    </>
  )
}
