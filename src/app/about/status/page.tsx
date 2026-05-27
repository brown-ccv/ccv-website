import React from "react"
import ActiveIssues from "@/components/status/ActiveIssues"
import IssueGrid from "@/components/status/IssueGrid"
import { getOpenIssues } from "@/lib/get-open-issues"

export default async function ActiveStatus() {
  const issues = await getOpenIssues()
  return (
    <>
      <IssueGrid issues={issues}></IssueGrid>
    </>
  )
}
