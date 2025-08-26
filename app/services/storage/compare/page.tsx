import React from "react"
import { Hero } from "@/components/Hero"
import { readContentFile } from "@/lib/content-utils"
import StorageTool from "@/components/storage/StorageTool"
import { PageContentData, SelectedAnswers } from "@/lib/storage-types"
import services from "@/content/services/storage-features.json"
import questions from "@/content/services/storage-questions.json"

export default async function CompareStorageOptions() {
  const rawPageContent = await readContentFile(
    "content/services/storage-tool.yaml"
  )
  const pageContent: PageContentData = rawPageContent.data as PageContentData

  let initialSelectedAnswers: SelectedAnswers = {}
  return (
    <>
      <Hero title={pageContent.title} description={pageContent.description} />

      <StorageTool
        pageContent={pageContent}
        questions={questions}
        initialSelectedAnswers={initialSelectedAnswers}
        services={services}
      />
    </>
  )
}
