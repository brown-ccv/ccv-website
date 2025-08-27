import React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { SelectedAnswers, FormQuestions } from "@/lib/storage-types"
import { StyledCard } from "@/components/card/StyledCard"

interface FormProps {
  selectedAnswers: SelectedAnswers
  onAnswerChange: (questionId: string, answer: string) => void
  questions: FormQuestions[]
  children: React.ReactNode
}

const Form: React.FC<FormProps> = ({
  selectedAnswers,
  onAnswerChange,
  questions,
  children,
}) => {
  return (
    <StyledCard title="Data Needs" className="max-w-lg flex-shrink-0">
      {questions.map((question) => (
        <React.Fragment key={question.id}>
          <p className="pt-6 text-xl font-medium text-black">
            {question.question}
          </p>

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

          <RadioGroup
            value={selectedAnswers[question.id]}
            onValueChange={(value) => onAnswerChange(question.id, value)}
            className="flex flex-col gap-x-4 space-y-2 pt-2 md:flex-row md:space-y-0"
          >
            {question.options.map((option) => (
              <div key={option.label} className="flex items-center space-x-2">
                <RadioGroupItem
                  aria-label={option.label}
                  value={option.label}
                  id={`${question.id}-${option.label}`}
                />
                <p>{option.label}</p>
              </div>
            ))}
          </RadioGroup>
        </React.Fragment>
      ))}
      <div className="mt-6 flex justify-end border-t border-gray-300 pt-4">
        {children}
      </div>
    </StyledCard>
  )
}

export default Form
