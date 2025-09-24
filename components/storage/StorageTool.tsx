"use client"

import React, { useCallback, useMemo, useState } from "react"
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

  const handleAnswerChange = useCallback(
    (questionId: string, answer: string) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }))
    },
    []
  )

  const handleReset = useCallback(() => {
    setSelectedAnswers(initialSelectedAnswers)
  }, [initialSelectedAnswers])

  const hasModifiedAnswers = useMemo(() => {
    return (
      Object.keys(selectedAnswers).some(
        (key) => selectedAnswers[key] !== initialSelectedAnswers[key]
      ) ||
      Object.keys(initialSelectedAnswers).some(
        (key) => selectedAnswers[key] !== initialSelectedAnswers[key]
      )
    )
  }, [selectedAnswers, initialSelectedAnswers])

  return (
    <>
      <ContentSection id="form" title="Storage Selection Tool">
        <p className="mb-6 text-lg leading-tight lg:text-xl">
          Answering the questions in the form will provide a list of services
          that meet your requirements.
        </p>
        <div
          className="hidden lg:flex lg:items-center lg:gap-4 lg:pb-8"
          role="navigation"
          aria-label="Page navigation"
        >
          <p className="text-lg" id="table-nav-desc">
            Want to dive into comparing features?
          </p>
          <ScrollButton
            variant="primary_outlined"
            size="md"
            id="table"
            aria-describedby="table-nav-desc"
            aria-label="Scroll to comparison table section"
          >
            View Comparison Table
            <Icon iconName="FaAngleDoubleDown" aria-hidden="true" />
          </ScrollButton>
        </div>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12">
          <Form
            selectedAnswers={selectedAnswers}
            onAnswerChange={handleAnswerChange}
            questions={questions}
          >
            <Button
              disabled={!hasModifiedAnswers}
              onClick={handleReset}
              variant="primary_outlined"
              size="sm"
              leftIcon={<Icon iconName="FaUndo" aria-hidden="true" />}
            >
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
        <p className="mb-6 text-lg leading-tight lg:text-xl">
          This tool lets you compare the available storage options at Brown to
          compare their features and decide which of these services best suits
          your needs. Select a storage service in the table for more information
          about the service.
        </p>

        <StorageTable services={services} />
      </ContentSection>
    </>
  )
}
