import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Question } from '@/lib/storage-types'
import { SelectedAnswers } from '@/lib/storage-types'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface FormProps {
  selectedAnswers: SelectedAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  questions: Question[];
}

const Form: React.FC<FormProps> = ({ selectedAnswers, onAnswerChange, questions }) => {
  return (
    <div className="space-y-2 px-8 pb-8 bg-white rounded-lg shadow-md max-w-[800px]">
      {questions.map((q) => (
        <div key={q.id}>
          <div className="pt-6 font-medium text-black text-2xl">
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
            >
              {`${q.question}`}
            </Markdown>
          </div>

          {q.more_info && q.more_info.length > 0 && (
            <div className="text-md">
              <ul className="pb-0">
                {q.more_info.map((infoItem, index) => (
                  <div key={index} className="flex items-center space-x-2 py-1">
                    {infoItem.href ? (
                      <p>
                        <a
                          href={infoItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {infoItem.text}
                        </a>
                      </p>
                    ) : (
                      <Markdown
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                      >
                        {infoItem.text}
                      </Markdown>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          )}

          <RadioGroup
            value={selectedAnswers[q.id]}
            onValueChange={(value) => onAnswerChange(q.id, value)}
            className="flex flex-col md:flex-row space-y-2 md:space-y-0 gap-x-4 px-4 pt-2"
          >
            {q.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                <p>{`${option.value}`}</p>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default Form;