export interface WorkItem {
  company: string;
  link: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectItem {
  title: string;
  link: string;
  subtitle: string;
  /** One or two sentences, always visible */
  summary: string;
  /** Shown when the project is expanded */
  details: string[];
  /** Label of the button that expands the details */
  detailsLabel: string;
  stack: string[];
  stats?: ProjectStat[];
}
