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
    <StyledCard size="md" className="pt-6">
      {questions.map((question) => (
        <React.Fragment key={question.id}>
          <h4>
            {question.question}
          </h4>

          {question.information &&
            question.information.map((info, index) => (
              <p key={index}>
                {info}
              </p>
            ))}
          {question.link && (
            <a
              href={question.link.value}
            >
              {question.link.label}
            </a>
          )}

          <RadioGroup
            value={selectedAnswers[question.id]}
            onValueChange={(value) => onAnswerChange(question.id, value)}
            className="flex flex-col gap-x-4 md:flex-row md:space-y-0"
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
      <div className="mt-6 flex justify-end border-t border-slate-300 pt-4">
        {children}
      </div>
    </StyledCard>
  )
}

export default Form
