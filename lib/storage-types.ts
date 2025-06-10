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
  
  // top level structure of storage.yaml
  // readContentFile()'s `data` property will contain this
  export interface PageContentData {
    title: string;
    description: string;
    storage_tool_header: string;
    services: StorageService[];
    questions: YAMLQuestionConfig[];
  }
  
  export interface Question {
    id: string;
    question: string;
    options: { label: string; value: string }[];
  }

  // for StorageTool's internal state
  export interface SelectedAnswers {
    [key: string]: string;
  }