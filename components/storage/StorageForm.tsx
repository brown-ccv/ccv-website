import React, { useCallback, useMemo } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { SelectedAnswers, FormQuestions } from "@/lib/storage-types"
import { StyledCard } from "@/components/card/StyledCard"

interface FormProps {
  selectedAnswers: SelectedAnswers
  onAnswerChange: (questionId: string, answer: string) => void
  questions: FormQuestions[]
  children: React.ReactNode
}

const FormQuestion = React.memo<{
  question: FormQuestions
  selectedValue: string | undefined
  onAnswerChange: (questionId: string, answer: string) => void
}>(({ question, selectedValue, onAnswerChange }) => {
  const handleValueChange = useCallback(
    (value: string) => {
      onAnswerChange(question.id, value)
    },
    [question.id, onAnswerChange]
  )

  const fieldsetId = `question-${question.id}`
  const legendId = `legend-${question.id}`

  return (
    <fieldset aria-labelledby={legendId} id={fieldsetId}>
      <legend id={legendId} className="text-xl font-medium">
        {question.question}
      </legend>

      {/* Information section */}
      {question.information &&
        question.information.map((info, index) => (
          <p className="text-sm" key={index}>
            {info}
          </p>
        ))}

      {question.link && (
        <a
          className="text-sm text-keppel-800 hover:text-keppel-600"
          href={question.link.value}
        >
          {question.link.label}
        </a>
      )}

      {/* Radio group */}
      <RadioGroup
        value={selectedValue || ""}
        onValueChange={handleValueChange}
        className="flex flex-col gap-x-4 space-y-2 pt-2 md:flex-row md:space-y-0"
        aria-labelledby={legendId}
      >
        {question.options.map((option) => {
          const radioId = `${question.id}-${option.label.replace(/\s+/g, "-").toLowerCase()}`
          return (
            <div key={option.label} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.label}
                aria-describedby={
                  question.information ? `${fieldsetId}-info` : undefined
                }
                aria-label={radioId}
                id={radioId}
              />
              <label htmlFor={radioId}>{option.label}</label>
            </div>
          )
        })}
      </RadioGroup>

      {question.information && question.information.length > 0 && (
        <div id={`${fieldsetId}-info`} className="sr-only">
          {question.information.join(" ")}
        </div>
      )}
    </fieldset>
  )
})

FormQuestion.displayName = "FormQuestion"

const Form: React.FC<FormProps> = ({
  selectedAnswers,
  onAnswerChange,
  questions,
  children,
}) => {
  const handleAnswerChange = useCallback(
    (questionId: string, answer: string) => {
      onAnswerChange(questionId, answer)
    },
    [onAnswerChange]
  )

  const memoizedQuestions = useMemo(() => questions, [questions])

  return (
    <StyledCard size="lg">
      <div className="my-6 flex justify-end border-b border-gray-300 pb-4">
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

export default React.memo(Form)
