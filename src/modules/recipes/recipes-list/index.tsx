import { type Post } from '@/core/utils/post';

import { RecipeCard } from './recipe-card';

interface RecipesListProps {
  posts: Post[];
}

export const RecipesList = ({ posts }: RecipesListProps) => {
  if (posts.length === 0) {
    return (
      <div className="w-full text-center">
        <p>Well guess I haven&apos;t made anything yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-start">
      {posts.map((post) => (
        <RecipeCard
          key={post.metadata.title}
          title={post.metadata.title}
          slug={post.slug}
          description={post.metadata.summary}
          imageUrl={post.metadata.image}
          date={new Date(post.metadata.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        />
      ))}
    </div>
  );
};
