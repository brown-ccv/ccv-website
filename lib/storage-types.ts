export interface Question {
  id: string; // corresponds to affected_category
  question: string;
  options: { label: string; value: string }[];
}

export interface SelectedAnswers {
  [key: string]: string;
}

export interface Feature {
  name: string;
  class: string | boolean | number;
  notes?: string[]; 
}

export interface YAMLQuestionAnswer {
  answer: string;
  category_classes: (string | boolean | number)[];
}

export interface YAMLQuestionConfig {
  question: string;
  information?: string;
  affected_category: string;
  default_answer: string;
  answers: YAMLQuestionAnswer[];
}

export interface YAMLFeatureConfig {
  name: string;
  class: string;
  notes?: string;
}

export interface YAMLServiceConfig {
  name: string;
  features: YAMLFeatureConfig[];
  category_classes?: { 
    [key: string]: string;
  };
}

export interface TableRow {
  featureName: string;
  [key: string]: YAMLFeatureConfig | undefined | string;
}
  
export interface TableProps {
  services: YAMLServiceConfig[];
  selectedAnswers: SelectedAnswers;
  yamlQuestionsConfig: YAMLQuestionConfig[];
}

// top level structure of storage.yaml
// readContentFile()'s `data` property will contain this
export interface PageContentData {
  title?: string;
  description?: string;
  storage_tool_header?: string;
  services: YAMLServiceConfig[]
  questions: YAMLQuestionConfig[];
  }