"use client"

import React, { useState } from "react"
import { Button } from "@/components/button/Button"
import { ScrollButton } from "@/components/button/ScrollButton"
import { ContentSection } from "@/components/ContentSection"
import Form from "@/components/storage/StorageForm"
import Table from "@/components/storage/StorageTable"
import {
  PageContentData,
  SelectedAnswers,
  StorageData,
  FormQuestions,
} from "@/lib/storage-types"
import StorageCards from "@/components/storage/StorageCards"
import Icon from "@/components/ui/RenderIcon"

interface StorageToolProps {
  pageContent: PageContentData | null
  questions: FormQuestions[]
  initialSelectedAnswers: SelectedAnswers
  services: StorageData
}

export default function StorageTool({
  pageContent,
  questions,
  initialSelectedAnswers,
  services,
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
    <>
      <ContentSection title="Compare Storage Options">
        <p className="mb-6 text-xl font-semibold">
          This tool lets you compare the available storage options at Brown to
          compare their features and decide which of these services best suits
          your needs. Select a storage service in the table for more information
          about the service.
        </p>

        <div className="space-y-4">
          <p className="text-lg">Need help looking for a storage option?</p>{" "}
          <ScrollButton variant="primary_outlined" id="form">
            Fill out the Form
            <Icon iconName="FaAngleDoubleDown" />
          </ScrollButton>
        </div>

        <Table services={services} />
      </ContentSection>
      <ContentSection id="form" title="Storage Selection Tool">
        <div className="flex flex-col gap-2">
          <p className="my-12 text-2xl font-semibold text-gray-800">
            Answering the questions in the form will provide a list of services
            that meet your requirements.
          </p>

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
      </ContentSection>
    </>
  )
}
