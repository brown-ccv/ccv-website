"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import Form from "@/components/ui/form"
import Table from "@/components/ui/table"
import { PageContentData, Question, SelectedAnswers, YAMLQuestionConfig, YAMLServiceConfig } from '@/lib/storage-types'

interface StorageToolProps {
    pageContent: PageContentData | null;
    questions: Question[];
    initialSelectedAnswers: SelectedAnswers;
    services: YAMLServiceConfig[];
    yamlQuestionsConfig: YAMLQuestionConfig[];
}

export default function StorageTool({ pageContent, questions, initialSelectedAnswers, services, yamlQuestionsConfig }: StorageToolProps) {
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>(initialSelectedAnswers);
  
    const handleAnswerChange = (questionId: string, answer: string) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }));
    };
  
    const handleReset = () => {
        setSelectedAnswers(initialSelectedAnswers);
    };
    
    return (
        <div>
            <section className="content-wrapper py-24 px-8 bg-neutral-50">
                <SectionHeader title="Compare Storage Options" align="center" />
                <div className="flex px-8 flex-col items-start pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mx-12 my-12">{pageContent?.storage_tool_header}</h2>
                    <div className="w-full mt-0 flex flex-col xl:flex-row gap-4">
                        <div>
                            <Form
                                selectedAnswers={selectedAnswers}
                                onAnswerChange={handleAnswerChange}
                                questions={questions}
                            />
                            <Button onClick={handleReset} variant="primary_filled" size="lg">
                                Reset Questions
                            </Button>
                        </div>
                        <Table
                          services={services}
                          selectedAnswers={selectedAnswers}
                          yamlQuestionsConfig={yamlQuestionsConfig}
                        />              
                    </div>
                </div>
            </section>
        </div>
    )
  }