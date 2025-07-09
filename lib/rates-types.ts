export interface ContentLinks {
  text: string;
  target: string;
  category: string;
}

export interface RatesCard {
  name: string;
  title: string;
  content: string;
  category?: string;
}

export interface RatesCategory {
  name: string;
  description: string;
}

export interface RatesSectionData {
  slug: string;
  title: string;
  content: string;
  description?: string;
  notes?: string;
  links?: ContentLinks[];
  sections?: RatesCard[];
  categories?: RatesCategory[];
}