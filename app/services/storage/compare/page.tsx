import React from "react"
import { Hero } from "@/components/Hero"
import { getMDXMetadata } from "@/lib/mdx-utils"
import StorageTool from "@/components/storage/StorageTool"
import { SelectedAnswers } from "@/lib/storage-types"
import services from "@/content/services/storage-features.json"
import questions from "@/content/services/storage-questions.json"

export default async function CompareStorageOptions() {
  const metadata = getMDXMetadata("content/services/storage-tool.mdx")
  let initialSelectedAnswers: SelectedAnswers = {}
  questions.map((question: any, index: number) => {
    initialSelectedAnswers[question.id] = question.default_answer
  })

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />

      <StorageTool
        questions={questions}
        initialSelectedAnswers={initialSelectedAnswers}
        services={services}
      />
    </>
  )
}
