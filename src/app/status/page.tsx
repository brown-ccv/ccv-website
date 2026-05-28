import React from "react"
import ActiveIssues from "@/components/status/ActiveIssues"
import IssueGrid from "@/components/status/IssueGrid"
import { getOpenIssues } from "@/lib/fetch-issues"
import "./status.css"

export default async function ActiveStatus() {
  const issues = await getOpenIssues()
  return (
    <>
      <IssueGrid issues={issues}></IssueGrid>
    </>
  )
}
