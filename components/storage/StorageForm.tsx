import React, { useCallback, useMemo } from "react"
import { FormQuestion } from "./FormQuestion"
import { SelectedAnswers, FormQuestions } from "@/lib/storage-types"
import { StyledCard } from "@/components/card/StyledCard"

interface FormProps {
  selectedAnswers: SelectedAnswers
  onAnswerChange: (questionId: string, answer: string) => void
  questions: FormQuestions[]
  children: React.ReactNode
}

function Form({
  selectedAnswers,
  onAnswerChange,
  questions,
  children,
}: FormProps) {
  const handleAnswerChange = useCallback(
    (questionId: string, answer: string) => {
      onAnswerChange(questionId, answer)
    },
    [onAnswerChange]
  )

  const memoizedQuestions = useMemo(() => questions, [questions])

  return (
    <StyledCard size="lg">
      <div className="my-6 flex justify-end border-b border-gray-300 py-4">
        {children}
      </div>
      <div className="space-y-8">
        {memoizedQuestions.map((question) => (
          <FormQuestion
            key={question.id}
            question={question}
            selectedValue={selectedAnswers[question.id]}
            onAnswerChange={handleAnswerChange}
          />
        ))}
      </div>
    </StyledCard>
  )
}

export const StorageForm = React.memo(Form)
