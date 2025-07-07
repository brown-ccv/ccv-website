import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SelectedAnswers, FormQuestions } from '@/lib/storage-types'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface FormProps {
  selectedAnswers: SelectedAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  questions: FormQuestions[];
}

const Form: React.FC<FormProps> = ({ selectedAnswers, onAnswerChange, questions }) => {
  return (
    <div className="space-y-2 px-8 pb-8 bg-white rounded-lg shadow-md max-w-[800px]">
      {questions.map((question) => (
        <div key={question.id}>
          <div className="pt-6 font-medium text-black text-2xl">
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {`${question.question}`}
            </Markdown>
          </div>

          {question.information && (
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="text-keppel-700 hover:text-keppel-500 underline" />
                ),
              }}
            >
              {question.information}
            </Markdown>
            )
          }

          <RadioGroup
            value={selectedAnswers[question.id]}
            onValueChange={(value) => onAnswerChange(question.id, value)}
            className="flex flex-col md:flex-row space-y-2 md:space-y-0 gap-x-4 px-4 pt-2"
          >
            {question.options.map((option) => (
              <div key={option.label} className="flex items-center space-x-2">
                <RadioGroupItem value={option.label} id={`${question.id}-${option.label}`} />
                <p>{`${option.label}`}</p>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default Form;