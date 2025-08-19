import React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { SelectedAnswers, FormQuestions } from "@/lib/storage-types"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import ButtonLink from "@/components/button/ButtonLink"
import { StyledCard } from "@/components/card/StyledCard"

interface FormProps {
  selectedAnswers: SelectedAnswers
  onAnswerChange: (questionId: string, answer: string) => void
  questions: FormQuestions[]
}

const Form: React.FC<FormProps> = ({
  selectedAnswers,
  onAnswerChange,
  questions,
}) => {
  return (
    <StyledCard title="Data Needs" className="max-w-full">
      {questions.map((question) => (
        <React.Fragment key={question.id}>
          <div className="pt-6 text-2xl font-medium text-black">
            <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
              {`${question.question}`}
            </Markdown>
          </div>

          {question.information && (
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, href, ...props }) => (
                  <ButtonLink href={href!} {...props} />
                ),
              }}
            >
              {question.information}
            </Markdown>
          )}

          <RadioGroup
            value={selectedAnswers[question.id]}
            onValueChange={(value) => onAnswerChange(question.id, value)}
            className="flex flex-col gap-x-4 space-y-2 px-2 pt-2 sm:px-4 md:flex-row md:space-y-0"
          >
            {question.options.map((option) => (
              <div key={option.label} className="flex items-center space-x-2">
                <RadioGroupItem
                  aria-label={option.label}
                  value={option.label}
                  id={`${question.id}-${option.label}`}
                />
                <p>{`${option.label}`}</p>
              </div>
            ))}
          </RadioGroup>
        </React.Fragment>
      ))}
    </StyledCard>
  )
}

export default Form
