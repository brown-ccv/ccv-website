export interface Person {
    name: string;
    github_user?: string;
}

export interface Link {
    category: string;
    url: string;
}

export interface Investigator {
    name: string;
    link: string;
}

export interface PortfolioEntry {
  title: string;
  slug: string;
  description: string;
  'project-type': string;
  starred: boolean;
  people: Person[];
  languages?: string[];
  tags?: string[];
  groups?: string[];
  department?: string[];
  links?: Link[];
  investigators?: Investigator[];
  image?: string;
}