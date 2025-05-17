import { getPostFiles } from "@/core/utils/blog";
import { BlogsList } from "@/modules/blogs/blogs-list";

import { PROJECTS_SECTION_ITEMS, WORK_SECTION_ITEMS } from "./constants";
import { HomepageSection } from "./section";

export const Sections = async () => {
  const postFiles = await getPostFiles();

  return (
    <div className="flex flex-col gap-4">
      <HomepageSection title="Work" items={WORK_SECTION_ITEMS} />
      <HomepageSection title="Projects" items={PROJECTS_SECTION_ITEMS} />
      {postFiles.length > 0 && (
        <div>
          {" "}
          <HomepageSection title="Blogs" items={[]} />
          <BlogsList />
        </div>
      )}
    </div>
  );
};
