export interface ContentLinks {
  text: string;
  target: string;
  category: string;
}

export interface RatesCard {
  name: string;
  title: string;
  content: string;
}

export interface RatesSectionData {
  slug: string;
  title: string;
  content: string;
  description?: string;
  notes?: string;
  links?: ContentLinks[];
  sections?: RatesCard[];
}