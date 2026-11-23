import { createRouter } from '@tanstack/react-router';

import {
  loadPostContent,
  type PostsType,
  type PostWithType,
} from '@/core/utils/post';

import { routeTree } from './routeTree.gen';

interface DehydratedPosts {
  posts: {
    type: PostsType;
    slug: string;
  }[];
}

const isPostLoaderData = (data: unknown): data is PostWithType =>
  typeof data === 'object' &&
  data !== null &&
  'type' in data &&
  'slug' in data &&
  'metadata' in data;

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    notFoundMode: 'root',
    caseSensitive: true,
    // Cross-fade the page content between routes (see globals.css).
    defaultViewTransition: true,
    // Post bodies are lazily loaded chunks. Tell the client which posts the
    // server rendered so it can load them before hydrating, which keeps the
    // server-rendered content in place without a suspense fallback. A failed
    // load must not block hydration of the rest of the page: <Post> shows the
    // error for the post body only.
    dehydrate: (): DehydratedPosts => ({
      posts: router.state.matches.flatMap(
        ({ loaderData }: { loaderData?: unknown }) =>
          isPostLoaderData(loaderData)
            ? [{ type: loaderData.type, slug: loaderData.slug }]
            : []
      ),
    }),
    hydrate: async ({ posts }: DehydratedPosts) => {
      await Promise.allSettled(
        posts.map(({ type, slug }) => loadPostContent(type, slug))
      );
    },
  });

  return router;
}
