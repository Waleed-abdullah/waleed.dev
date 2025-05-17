export interface HomepageSectionItem {
  title: string;
  subtitle?: string;
  description?: string;
  link: string;
}

export interface HomepageSectionProps {
  title: string;
  items: HomepageSectionItem[];
}
