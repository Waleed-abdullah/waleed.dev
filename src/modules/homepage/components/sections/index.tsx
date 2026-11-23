import { type Post } from '@/core/utils/post';
import { BlogsList } from '@/modules/blogs/blogs-list';
import { RecipesList } from '@/modules/recipes/recipes-list';

import { PROJECTS_SECTION_ITEMS, WORK_SECTION_ITEMS } from './constants';
import { HomepageSection } from './section';

interface SectionsProps {
  blogs: Post[];
  recipes: Post[];
}

export const Sections = ({ blogs, recipes }: SectionsProps) => {
  return (
    <div className="flex flex-col gap-10">
      <HomepageSection title="Work" items={WORK_SECTION_ITEMS} />
      <HomepageSection title="Projects" items={PROJECTS_SECTION_ITEMS} />
      {blogs.length > 0 && (
        <div>
          <HomepageSection title="Blogs" items={[]} />
          <BlogsList posts={blogs} />
        </div>
      )}
      {recipes.length > 0 && (
        <div>
          <HomepageSection title="Recipes" items={[]} />
          <RecipesList posts={recipes} />
        </div>
      )}
    </div>
  );
};
