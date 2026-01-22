import React from "react"
import { useCallback } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { FormQuestions } from "@/lib/storage-types"

interface FormQuestionProps {
  question: FormQuestions
  selectedValue: string | undefined
  onAnswerChange: (questionId: string, answer: string) => void
}

function Question({
  question,
  selectedValue,
  onAnswerChange,
}: FormQuestionProps) {
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
}

export const FormQuestion = React.memo(Question)
