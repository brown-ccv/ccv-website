export interface ServiceFeature {
  name: string;
  class: string | boolean | number;
  notes?: string;
}

export interface YAMLQuestionAnswer {
  answer: string;
  category_classes: (string | boolean | number)[];
}

export interface YAMLQuestionInfo {
  text: string;
  href?: string;
}

export interface YAMLQuestionConfig {
  question: string;
  more_info?: YAMLQuestionInfo[];
  information?: string;
  affected_category: string;
  default_answer: string;
  answers: YAMLQuestionAnswer[];
}

export interface YAMLServiceConfig {
  name: string;
  description?: string;
  features: ServiceFeature[];
  category_classes?: {
    [key: string]: string;
  };
}

export interface Question {
  id: string; // corresponds to affected_category
  question: string;
  options: { label: string; value: string }[];
  more_info?: YAMLQuestionInfo[];
  information?: string;
}

export interface SelectedAnswers {
  [key: string]: string;
}

export interface TableRow {
  featureName: string;
  [key: string]: ServiceFeature | undefined | string;
}

export interface TableProps {
  services: YAMLServiceConfig[];
  selectedAnswers: SelectedAnswers;
  yamlQuestionsConfig: YAMLQuestionConfig[];
}

// Top-level structure of content file
export interface PageContentData {
  title?: string;
  description?: string;
  icon?: string;
  links?: { text: string; target: string }[];
  storage_tool_header?: string;
  services: YAMLServiceConfig[];
  questions: YAMLQuestionConfig[];
}