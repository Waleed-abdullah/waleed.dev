import { createFileRoute, notFound, rootRouteId } from '@tanstack/react-router';

import { getAdjacentPosts, getPost, loadPostContent } from '@/core/utils/post';
import { getPostHeadMeta } from '@/modules/post/head';
import { PostPage } from '@/modules/post/post-page';

const Page = () => {
  // Undefined when the loader threw notFound() for an unknown slug. The root
  // route renders the not-found page in that case, but this component can
  // still render once with the cached match during client navigation.
  const data = Route.useLoaderData();

  return data ? <PostPage post={data} adjacent={data.adjacent} /> : null;
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

    return {
      ...post,
      type: 'recipes' as const,
      adjacent: getAdjacentPosts('recipes', post.slug),
    };
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
