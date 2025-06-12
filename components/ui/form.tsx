import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Question } from '@/lib/storage-types'
  
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
      <div className="space-y-2 px-8 pb-8  bg-white rounded-lg shadow-md">
        {questions.map((q) => (
          <div key={q.id}>
            <h2 className="pt-6 pb-2 font-medium text-black text-2xl tracking-tighter">
                {`${q.question}`}
            </h2>
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