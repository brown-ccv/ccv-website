import React from "react"
import path from 'path'
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { readContentFile } from "@/lib/content-utils"
import StorageTool from "@/components/StorageTool"
import { PageContentData, Question, SelectedAnswers, YAMLQuestionConfig } from '@/lib/storage-types'

const rawPageContent = await readContentFile('content/services/storage/storage-tool.yaml');
const pageContent: PageContentData | null = rawPageContent ? (rawPageContent.data as PageContentData) : null;

let questions: Question[] = [];
let initialSelectedAnswers: SelectedAnswers = {};
let rawYamlQuestionsConfig: YAMLQuestionConfig[] = [];

if (pageContent) {
  rawYamlQuestionsConfig = pageContent.questions;

  // map questions in yaml to format expected in form component
  questions = pageContent.questions.map((question: YAMLQuestionConfig) => {
    const questionId = question.affected_category;
    const options = question.answers.map(ans => ({
      label: ans.answer,
      value: ans.answer,
    }));
    initialSelectedAnswers[questionId] = question.default_answer;
    return {
      id: questionId,
      question: question.question,
      options: options,
      more_info: question.more_info,
      information: question.information,
    };
  });

  // --- Sort questions to match the table's feature order ---
  // 1. Get unique feature names from services and sort them alphabetically
  const uniqueFeatureNames = new Set<string>();
  pageContent.services.forEach(service => {
    service.features.forEach(feature => uniqueFeatureNames.add(feature.name));
  });
  const sortedFeatureNames = Array.from(uniqueFeatureNames).sort();

  // 2. Create a map for quick lookup of the sorted index
  const featureOrderMap = new Map<string, number>();
  sortedFeatureNames.forEach((name, index) => {
    featureOrderMap.set(name, index);
  });

  // 3. Sort the questions array based on the determined feature order
  questions.sort((a, b) => {
    const orderA = featureOrderMap.get(a.id) ?? Infinity; // Use Infinity for questions not found in features
    const orderB = featureOrderMap.get(b.id) ?? Infinity;
    return orderA - orderB;
  });
}

export default function CompareStorageOptions() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-blue-navbar">
            <Hero image={"/images/hero-subroutes.jpeg"}>
              <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                  <TextAnimate className="font-bold text-6xl md:text-8xl">
                    {pageContent?.title || ''}
                  </TextAnimate>
                  <p className="text-4xl font-semibold">
                    {pageContent?.description}
                  </p>
                </div>
              </div>
              </Hero>
            </div>
        </div>
        <StorageTool
          pageContent={pageContent}
          questions={questions}
          initialSelectedAnswers={initialSelectedAnswers}
          services={pageContent?.services || []}
          yamlQuestionsConfig={rawYamlQuestionsConfig}
        />
      </div>
    )
  }