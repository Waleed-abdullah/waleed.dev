import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { getAllPostSlugsWithMetadata } from '@/core/utils/post';

import { RecipeCard } from './recipe-card';

export const RecipesList = async () => {
  try {
    const posts = await getAllPostSlugsWithMetadata('recipes');

    if (posts.length === 0) {
      return (
        <div className="w-full text-center">
          <p>Well guess I haven&apos;t made anything yet</p>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {posts.map((post) => (
          <RecipeCard
            key={post.metadata.title}
            title={post.metadata.title}
            href={`${ABSOLUTE_ROUTES.RECIPES}/${post.slug}`}
            description={post.metadata.summary}
            imageUrl={post.metadata.image}
            date={new Date(post.metadata.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          />
        ))}
      </div>
    );
  } catch {
    return (
      <div className="w-full text-center">
        <p>Welp, something went wrong</p>
      </div>
    );
  }
};
