// --- about/us
export interface PeopleTypes{
  name: string;
  type: string;
  team: string;
  subteam: string;
  title: string;
  github_username: string;
  brown_directory_uuid: string;
  bio: string;
  image: string;
}

// --- about/contact
export interface ContactUsTypes {
  title: string;
  icon?: string;
  description: string;
  buttonLinks?: { text: string; href: string }[];
}

export interface OfficeHoursTypes {
  title: string;
  subtitle: string;
  description: string;
  buttonLinks?: { text: string; href: string }[];
}

export interface ContactUsSection {
  description: string;
  cards: ContactUsTypes[];
}

export interface OfficeHoursSection {
  description: string;
  cards: OfficeHoursTypes[];
}

export interface LocationSection {
  description: string;
}

// --- generic
export interface PageContentData {
    title?: string;
    description?: string;
    contactUs: ContactUsSection;
    officeHours: OfficeHoursSection;
    location: LocationSection;
    people: PeopleTypes[];
  }