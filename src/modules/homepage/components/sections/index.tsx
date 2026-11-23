import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { type Post } from '@/core/utils/post';
import { BlogsList } from '@/modules/blogs/blogs-list';
import { RecipesList } from '@/modules/recipes/recipes-list';

import { SectionHeading } from '../section-heading';
import { PROJECT_ITEMS, WORK_ITEMS } from './constants';
import { ProjectItem } from './project-item';
import { WorkItem } from './work-item';

interface SectionsProps {
  blogs: Post[];
  recipes: Post[];
}

export const Sections = ({ blogs, recipes }: SectionsProps) => {
  return (
    <>
      <section aria-labelledby="work" className="flex flex-col gap-6">
        <SectionHeading id="work" title="Work" />
        {WORK_ITEMS.map((item) => (
          <WorkItem key={item.company} item={item} />
        ))}
      </section>

      <section aria-labelledby="projects" className="flex flex-col gap-6">
        <SectionHeading id="projects" title="Projects" />
        <div className="flex flex-col">
          {PROJECT_ITEMS.map((project) => (
            <ProjectItem key={project.title} project={project} />
          ))}
        </div>
      </section>

      {blogs.length > 0 && (
        <section aria-labelledby="blogs" className="flex flex-col gap-3">
          <SectionHeading
            id="blogs"
            title="Blogs"
            action={{ to: ABSOLUTE_ROUTES.BLOGS, label: 'All posts' }}
          />
          <BlogsList posts={blogs} />
        </section>
      )}

      {recipes.length > 0 && (
        <section aria-labelledby="recipes" className="flex flex-col gap-5">
          <SectionHeading
            id="recipes"
            title="Recipes"
            action={{ to: ABSOLUTE_ROUTES.RECIPES, label: 'All recipes' }}
          />
          <RecipesList posts={recipes} />
        </section>
      )}
    </>
  );
};
