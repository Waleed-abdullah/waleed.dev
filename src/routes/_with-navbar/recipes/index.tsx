import { createFileRoute } from '@tanstack/react-router';

import { getAllPostSlugsWithMetadata } from '@/core/utils/post';
import { Recipes } from '@/modules/recipes';

const Page = () => {
  const posts = Route.useLoaderData();

  return <Recipes posts={posts} />;
};

export const Route = createFileRoute('/_with-navbar/recipes/')({
  loader: () => getAllPostSlugsWithMetadata('recipes'),
  component: Page,
});
