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
  StorageData,
  FormQuestions,
} from "@/lib/storage-types"
import StorageCards from "@/components/storage/StorageCards"

interface StorageToolProps {
  pageContent: PageContentData | null
  questions: FormQuestions[]
  initialSelectedAnswers: SelectedAnswers
  services: StorageData
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
      <div className="flex flex-col gap-2 md:hidden">
        <h2 className="my-12 text-2xl font-semibold text-gray-800">
          {pageContent?.storage_tool_header}
        </h2>
        <Form
          selectedAnswers={selectedAnswers}
          onAnswerChange={handleAnswerChange}
          questions={questions}
        />
        <Button
          onClick={handleReset}
          variant="primary_filled"
          size="lg"
          className="mb-8"
        >
          Reset Questions
        </Button>
        {/*<StorageCards*/}
        {/*  services={services}*/}
        {/*  selectedAnswers={selectedAnswers}*/}
        {/*  questions={questionsConfig}*/}
        {/*/>*/}
      </div>
      <Table services={services} />
    </ContentSection>
  )
}
