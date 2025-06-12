import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Question } from '@/lib/storage-types'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
  
  interface SelectedAnswers {
    [key: string]: string; 
  }
  
  interface FormProps {
    selectedAnswers: SelectedAnswers;
    onAnswerChange: (questionId: string, answer: string) => void;
    questions: Question[];
  }
  
  const Form: React.FC<FormProps> = ({ selectedAnswers, onAnswerChange, questions }) => {
    return (
      <div className="space-y-2 px-8 pb-8  bg-white rounded-lg shadow-md max-w-[600px]">
        {questions.map((q) => (
          <div key={q.id}>
            <div className="pt-6 pb-2 font-medium text-black text-2xl">
              <Markdown 
                rehypePlugins={[rehypeRaw]} 
                remarkPlugins={[remarkGfm]}
              >
                {`${q.question}`}
              </Markdown>
            </div>
            <RadioGroup
              value={selectedAnswers[q.id]}
              onValueChange={(value) => onAnswerChange(q.id, value)}
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 gap-x-4 px-4"
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