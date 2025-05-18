import { getPostFiles } from "@/core/utils/post";
import { BlogsList } from "@/modules/blogs/blogs-list";
import { RecipesList } from "@/modules/recipes/recipes-list";

import { PROJECTS_SECTION_ITEMS, WORK_SECTION_ITEMS } from "./constants";
import { HomepageSection } from "./section";

export const Sections = async () => {
  const blogFiles = await getPostFiles("blogs");
  const recipeFiles = await getPostFiles("recipes");

  return (
    <div className="flex flex-col gap-4">
      <HomepageSection title="Work" items={WORK_SECTION_ITEMS} />
      <HomepageSection title="Projects" items={PROJECTS_SECTION_ITEMS} />
      {blogFiles.length > 0 && (
        <div>
          <HomepageSection title="Blogs" items={[]} />
          <BlogsList />
        </div>
      )}
      {recipeFiles.length > 0 && (
        <div>
          <HomepageSection title="Recipes" items={[]} />
          <RecipesList />
        </div>
      )}
    </div>
  );
};
