"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import Form from "@/components/ui/form"
import { PageContentData, Question, SelectedAnswers } from '@/lib/storage-types'

interface StorageToolProps {
    pageContent: PageContentData | null;
    questions: Question[];
    initialSelectedAnswers: SelectedAnswers; 
}

export default function StorageTool({ pageContent, questions, initialSelectedAnswers }: StorageToolProps) {
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
            <section className="content-wrapper py-24 px-8 lg:px-36 bg-white">
                <SectionHeader title="Compare Storage Options" align="center" />
                <div className="bg-gray-50 flex px-8 lg:px-12 flex-col items-start pb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mx-12 my-12">{pageContent?.storage_tool_header}</h2>
                    <div className="w-full mt-0 flex flex-col xxl:flex-row gap-2">
                    <Form
                        selectedAnswers={selectedAnswers}
                        onAnswerChange={handleAnswerChange}
                        questions={questions}
                    />
                    {/* Table will go here */}
                    </div>
                    <div className="flex justify-center items-center">
                        <Button onClick={handleReset} variant="primary_filled" size="lg">
                        Reset Questions
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
  }