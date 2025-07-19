import React from "react"
import { Hero } from "@/components/Hero"
import { readContentFile } from "@/lib/content-utils"
import StorageTool from "@/components/storage/StorageTool"
import { PageContentData, QuestionsConfig, SelectedAnswers, FormQuestions } from '@/lib/storage-types'

export default async function CompareStorageOptions() {
  const rawPageContent = await readContentFile('content/services/storage/storage-tool.yaml');
  const pageContent: PageContentData = rawPageContent.data as PageContentData;

  let formQuestions: FormQuestions[] = [];
  let initialSelectedAnswers: SelectedAnswers = {};
  let rawQuestionsConfig: QuestionsConfig[] = [];

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
  pageContent.services.forEach(service => {
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

  return (
    <div>
        <Hero 
          image={"/images/hero-subroutes.jpeg"}
          title={pageContent.title}
          description={pageContent.description}
        />

      <StorageTool
        pageContent={pageContent}
        questions={formQuestions}
        initialSelectedAnswers={initialSelectedAnswers}
        services={pageContent.services}
        questionsConfig={rawQuestionsConfig}
      />
    </div>
  )
}