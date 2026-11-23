import { ClientErrorBoundary } from '@/core/components/error-boundary';
import { PageHeader } from '@/core/components/page-header';
import { type Post } from '@/core/utils/post';

import { RecipesList } from './recipes-list';

interface RecipesProps {
  posts: Post[];
}

export const Recipes = ({ posts }: RecipesProps) => {
  return (
    <div className="mx-auto flex w-full max-w-[36rem] flex-col gap-8 sm:gap-10">
      <PageHeader title="Recipes">
        Here I share recipes for cool stuff that I have made
      </PageHeader>
      <ClientErrorBoundary
        fallback={
          <div className="w-full text-center">
            <p>Welp, something went wrong</p>
          </div>
        }
      >
        <RecipesList posts={posts} />
      </ClientErrorBoundary>
    </div>
  );
};
