import { formatPostDate } from '@/core/utils/date';
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
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.slug}>
          <RecipeCard
            slug={post.slug}
            title={post.metadata.title}
            description={post.metadata.summary}
            imageUrl={post.metadata.image}
            date={post.metadata.date}
            formattedDate={formatPostDate(post.metadata.date)}
          />
        </li>
      ))}
    </ul>
  );
};
