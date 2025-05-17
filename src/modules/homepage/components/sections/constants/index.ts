import { type HomepageSectionItem } from "../section/types";

export const WORK_SECTION_ITEMS: HomepageSectionItem[] = [
  {
    title: "Vyro",
    subtitle: "Software Engineer (March 2024 - Present)",
    description:
      "Promoted to Frontend Lead for Chatly-Everask team after leading core frontend initiatives. Built a LLM chat library for React and a custom Rehype plugin for dynamic content rendering. Focused on performance and improving user experience while closely collaborating with Backend, ML, and Product teams. Mentored engineers, ran code reviews, and conducted interviews to support team growth.",
    link: "https://vyro.ai/",
  },
] as const;

export const PROJECTS_SECTION_ITEMS: HomepageSectionItem[] = [
  {
    title: "Chatly",
    subtitle: "All-in-one AI chat platform.",
    description:
      "Led the frontend development of Chatly Web by building the core architecture, design system, and reusable component library. Developed a custom chat library enabling LLM streaming through SSE. Created a rehype plugin to parse and render dynamic content. The platform now handles over 9M+ monthly requests, 1M+ MAUs. Focused on optimizing performance and maintainability while collaborating closely with Backend and ML teams to deliver new features and resolve issues.",
    link: "https://chatlyai.app/",
  },
  {
    title: "Imagine Web",
    subtitle: "AI generation platform.",
    description:
      "Contributed to transforming Imagine Web into a scalable Turborepo monorepo by creating core reusable packages, including ESLint & TS configs and design system package. Did some pretty cool Typescript stuff in the project and worked on creating Studios for Imagine AI tools suite.",
    link: "https://www.imagine.art/dashboard",
  },
] as const;
