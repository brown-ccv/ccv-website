"use client"

import React, { useState } from "react"
import { Button } from "@/components/button/Button"
import { ContentSection } from "@/components/ContentSection"
import Form from "@/components/storage/StorageForm"
import Table from "@/components/storage/StorageTable"
import {
  PageContentData,
  SelectedAnswers,
  QuestionsConfig,
  ServiceConfig,
  FormQuestions,
} from "@/lib/storage-types"

interface StorageToolProps {
  pageContent: PageContentData | null
  questions: FormQuestions[]
  initialSelectedAnswers: SelectedAnswers
  services: ServiceConfig[]
  questionsConfig: QuestionsConfig[]
}

export default function StorageTool({
  pageContent,
  questions,
  initialSelectedAnswers,
  services,
  questionsConfig,
}: StorageToolProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>(
    initialSelectedAnswers
  )

  const handleAnswerChange = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleReset = () => {
    setSelectedAnswers(initialSelectedAnswers)
  }

  return (
    <ContentSection title="Compare Storage Options">
      <div className="flex flex-col items-start pb-8">
        <h2 className="my-12 text-2xl font-bold text-gray-800">
          {pageContent?.storage_tool_header}
        </h2>
        <div className="mt-0 flex w-full flex-col items-center gap-4 xl:flex-row xl:items-start">
          <div className="w-full">
            <Form
              selectedAnswers={selectedAnswers}
              onAnswerChange={handleAnswerChange}
              questions={questions}
            />
            <Button onClick={handleReset} variant="primary_filled" size="lg">
              Reset Questions
            </Button>
          </div>
          <Table
            services={services}
            selectedAnswers={selectedAnswers}
            questions={questionsConfig}
          />
        </div>
      </div>
    </ContentSection>
  )
}
