import React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SelectedAnswers, FormQuestions } from "@/lib/storage-types"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import ButtonLink from "@/components/ui/button-link"

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
    <div className="space-y-2 px-4 sm:px-6 md:px-8 pb-8 bg-gradient-to-br from-white to-neutral-50/30 rounded-2xl max-w-[800px] border border-neutral-300">
      {questions.map((question) => (
        <React.Fragment key={question.id}>
          <div className="pt-6 font-medium text-black text-2xl">
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
            className="flex flex-col md:flex-row space-y-2 md:space-y-0 gap-x-4 px-2 sm:px-4 pt-2"
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
    </div>
  )
}

export default Form
