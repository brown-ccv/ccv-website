"use client"

import React, { useState } from "react"
import { Button } from "@/components/button/Button"
import { ScrollButton } from "@/components/button/ScrollButton"
import { ContentSection } from "@/components/ContentSection"
import Form from "@/components/storage/StorageForm"
import StorageTable from "@/components/storage/StorageTable"
import {
  SelectedAnswers,
  StorageData,
  FormQuestions,
} from "@/lib/storage-types"
import StorageCards from "@/components/storage/StorageCards"
import Icon from "@/components/ui/RenderIcon"

interface StorageToolProps {
  questions: FormQuestions[]
  initialSelectedAnswers: SelectedAnswers
  services: StorageData
}

export default function StorageTool({
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
      <ContentSection id="form" title="Storage Selection Tool">
        <p className="text-lg leading-tight lg:text-xl mb-6">
          Answering the questions in the form will provide a list of services
          that meet your requirements.
        </p>
        <div className="hidden lg:flex lg:items-center lg:gap-4 lg:pb-8">
          <p>Want to dive into comparing features?</p>
          <ScrollButton variant="primary_outlined" id="table">
            View Comparison Table
            <Icon iconName="FaAngleDoubleDown" />
          </ScrollButton>
        </div>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12">
          <Form
            selectedAnswers={selectedAnswers}
            onAnswerChange={handleAnswerChange}
            questions={questions}
          >
            <Button onClick={handleReset} variant="primary_outlined" size="md">
              Reset Questions
            </Button>
          </Form>

          <StorageCards
            services={services}
            selectedAnswers={selectedAnswers}
            questions={questions}
          />
        </div>
      </ContentSection>
      <ContentSection
        id="table"
        title="Compare Storage Options"
        className="hidden lg:block"
      >
        <h4 className="text-lg leading-tight lg:text-xl mb-6">
          This tool lets you compare the available storage options at Brown to
          compare their features and decide which of these services best suits
          your needs. Select a storage service in the table for more information
          about the service.
        </h4>

        <StorageTable services={services} />
      </ContentSection>
    </>
  )
}
