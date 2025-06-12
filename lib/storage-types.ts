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
  class: string | boolean | number; // 'fast', true, 2, '1 TB +' etc.
  notes?: string[]; // Optional array of strings
}
  
export interface StorageService {
  name: string;
  description: string;
  features: Feature[];
  Limitations?: string;
  Rate?: string;
  "More info"?: string; // use string literal for property name with space
  Accessibility?: string;
  Sharing?: string;
}

export interface YAMLQuestionAnswer {
  answer: string;
  category_classes: (string | boolean | number)[]; // e.g., [0, 1, 2, 3] or ['True', 'False']
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
  [key: string]: YAMLFeatureConfig | undefined | string; // Allow 'string' for featureName itself
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