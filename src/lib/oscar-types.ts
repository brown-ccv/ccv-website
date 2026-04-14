export interface ContentLinks {
  text: string
  href: string
}

export interface OscarSubsection {
  title: string
  description: string
  links?: ContentLinks[]
}

export interface OscarData {
  title: string
  description: string
  sectionTitle: string
  subsections: OscarSubsection[]
}
