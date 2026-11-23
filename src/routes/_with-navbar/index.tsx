import { createFileRoute } from '@tanstack/react-router';

import { getAllPostSlugsWithMetadata } from '@/core/utils/post';
import { Homepage } from '@/modules/homepage';

const Home = () => {
  const { blogs, recipes } = Route.useLoaderData();

  return <Homepage blogs={blogs} recipes={recipes} />;
};

export const Route = createFileRoute('/_with-navbar/')({
  loader: () => ({
    blogs: getAllPostSlugsWithMetadata('blogs'),
    recipes: getAllPostSlugsWithMetadata('recipes'),
  }),
  component: Home,
});
