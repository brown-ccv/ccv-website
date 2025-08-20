import React from "react"
import { Hero } from "@/components/Hero"
import { readContentFile } from "@/lib/content-utils"
import StorageTool from "@/components/storage/StorageTool"
import {
  PageContentData,
  QuestionsConfig,
  SelectedAnswers,
  FormQuestions,
} from "@/lib/storage-types"
import services from "@/content/services/storage-tool.json"

export default async function CompareStorageOptions() {
  const rawPageContent = await readContentFile(
    "content/services/storage-tool.yaml"
  )
  const pageContent: PageContentData = rawPageContent.data as PageContentData

  let formQuestions: FormQuestions[] = []
  let initialSelectedAnswers: SelectedAnswers = {}
  let rawQuestionsConfig: QuestionsConfig[] = []

  if (pageContent.questions) {
    rawQuestionsConfig = pageContent.questions

    formQuestions = pageContent.questions.map((question: QuestionsConfig) => {
      const qid = question.affected_feature
      const options = question.answers.map((answer) => ({
        label: answer.answer,
        value: answer.matching_feature_values,
      }))
      initialSelectedAnswers[qid] = question.default_answer
      return {
        id: qid,
        question: question.question,
        options: options,
        information: question.information,
      }
    })
  }
  return (
    <>
      <Hero title={pageContent.title} description={pageContent.description} />

      <StorageTool
        pageContent={pageContent}
        questions={formQuestions}
        initialSelectedAnswers={initialSelectedAnswers}
        services={services}
        questionsConfig={rawQuestionsConfig}
      />
    </>
  )
}
