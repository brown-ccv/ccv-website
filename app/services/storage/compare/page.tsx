import React from "react"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { readContentFile } from "@/lib/content-utils"
import StorageTool from "@/components/StorageTool"
import { PageContentData, QuestionsConfig, SelectedAnswers, FormQuestions } from '@/lib/storage-types'

export default async function CompareStorageOptions() {
  const rawPageContent = await readContentFile('content/services/storage/storage-tool.yaml');
  const pageContent: PageContentData | null = rawPageContent ? (rawPageContent.data as PageContentData) : null;

  let formQuestions: FormQuestions[] = [];
  let initialSelectedAnswers: SelectedAnswers = {};
  let rawQuestionsConfig: QuestionsConfig[] = [];

  if (pageContent) {
    if (pageContent.questions) {
      rawQuestionsConfig = pageContent.questions;

      formQuestions = pageContent.questions.map((question: QuestionsConfig) => {
        const qid = question.affected_feature;
        const options = question.answers.map(answer => ({
          label: answer.answer,
          value: answer.matching_feature_values,
        }));
        initialSelectedAnswers[qid] = question.default_answer;
        return {
          id: qid,
          question: question.question,
          options: options,
          information: question.information,
        };
      });
    }

    // --- Sort questions to match the table's feature order ---
    // 1. Get unique feature names from services and sort them alphabetically
    const uniqueFeatureNames = new Set<string>();
    pageContent?.services.forEach(service => {
      if (service.features) {
        service.features.forEach(feature => {
          uniqueFeatureNames.add(feature.name)
        });
      };
    });
    const sortedFeatureNames = Array.from(uniqueFeatureNames).sort();

    // 2. Create a map for quick lookup of the sorted index
    const featureOrderMap = new Map<string, number>();
    sortedFeatureNames.forEach((name, index) => {
      featureOrderMap.set(name, index);
    });
  }

  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero image={"/images/hero-subroutes.jpeg"}>
            <div className="relative flex-1 flex items-start w-full bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
              <div className="absolute top-[12%] inset-x-0 flex flex-col text-white space-y-6 px-12 md:px-24 ">
                <TextAnimate className="font-bold text-6xl md:text-8xl">
                  {pageContent?.title || ''}
                </TextAnimate>
                <p className="text-4xl font-semibold">
                  {pageContent?.storage_tool_header}
                </p>
              </div>
            </div>
          </Hero>
        </div>
      </div>
      <StorageTool
        pageContent={pageContent}
        questions={formQuestions}
        initialSelectedAnswers={initialSelectedAnswers}
        services={pageContent?.services || []}
        questionsConfig={rawQuestionsConfig}
      />
    </div>
  )
}