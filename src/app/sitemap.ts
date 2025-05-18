import { type MetadataRoute } from 'next';

import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { getAllPostSlugsWithMetadata } from '@/core/utils/post';

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getAllPostSlugsWithMetadata('blogs');
  const recipes = await getAllPostSlugsWithMetadata('recipes');

  return [
    {
      url: ABSOLUTE_ROUTES.ROOT,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: ABSOLUTE_ROUTES.BLOGS,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: ABSOLUTE_ROUTES.RECIPES,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    ...blogs.map((blog) => ({
      url: `${ABSOLUTE_ROUTES.BLOGS}/${blog.slug}`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    })),
    ...recipes.map((recipe) => ({
      url: `${ABSOLUTE_ROUTES.RECIPES}/${recipe.slug}`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    })),
  ];
}
