"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
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
    <div>
      <section className="content-wrapper py-24 px-8 bg-white">
        <SectionHeader title="Compare Storage Options" align="center" />
        <div className="flex px-8 flex-col items-start pb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mx-24 my-12">
            {pageContent?.storage_tool_header}
          </h3>
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
      </section>
    </div>
  )
}
