"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { ContentSection } from "@/components/ui/content-section"
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
    <ContentSection className="bg-neutral-50">
      <SectionHeader title="Compare Storage Options" align="center" />
      <div className="flex flex-col items-start pb-8">
        <h2 className="text-2xl font-bold text-gray-800 my-12">
          {pageContent?.storage_tool_header}
        </h2>
        <div className="w-full mt-0 flex flex-col xl:flex-row gap-4 items-center xl:items-start">
          <div>
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
