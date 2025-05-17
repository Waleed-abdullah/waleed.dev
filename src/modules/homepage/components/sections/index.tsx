import { PROJECTS_SECTION_ITEMS, WORK_SECTION_ITEMS } from "./constants";
import { HomepageSection } from "./section";

export const Sections = () => {
  return (
    <div className="flex flex-col gap-4">
      <HomepageSection title="Work" items={WORK_SECTION_ITEMS} />
      <HomepageSection title="Projects" items={PROJECTS_SECTION_ITEMS} />
    </div>
  );
};
