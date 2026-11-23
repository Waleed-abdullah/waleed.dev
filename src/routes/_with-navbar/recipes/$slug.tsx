import { createFileRoute, notFound, rootRouteId } from '@tanstack/react-router';

import { getPost, loadPostContent } from '@/core/utils/post';
import { Post } from '@/modules/post';
import { getPostHeadMeta } from '@/modules/post/head';

const Page = () => {
  // Undefined when the loader threw notFound() for an unknown slug. The root
  // route renders the not-found page in that case, but this component can
  // still render once with the cached match during client navigation.
  const slug = Route.useLoaderData({ select: (post) => post?.slug });

  return slug ? <Post type="recipes" slug={slug} /> : null;
};

export const Route = createFileRoute('/_with-navbar/recipes/$slug')({
  loader: async ({ params }) => {
    const post = getPost('recipes', params.slug);

    if (!post) throw notFound({ routeId: rootRouteId });

    // In the browser a failed chunk load is shown by the error boundary in
    // <Post>, so it does not fail the whole route. On the server it fails the
    // request (and the prerender).
    await loadPostContent('recipes', post.slug).catch((error: unknown) => {
      if (import.meta.env.SSR) throw error;
    });

    return { ...post, type: 'recipes' as const };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? getPostHeadMeta(loaderData, {
          keyword: 'Recipes',
          defaultCategory: 'Recipe',
        })
      : [],
  }),
  component: Page,
});
