import { Suspense, use } from 'react';

import { ClientErrorBoundary } from '@/core/components/error-boundary';
import { getPostContent, type PostsType } from '@/core/utils/post';

interface PostProps {
  type: PostsType;
  slug: string;
}

const PostContent = ({ type, slug }: PostProps) => {
  const Content = use(getPostContent(type, slug));

  // `Content` is the default export of the post module, cached per post, so
  // its identity is stable across renders.
  // eslint-disable-next-line react-hooks/static-components
  return <Content />;
};

/**
 * Renders the MDX body of a post. The body is normally loaded before rendering
 * (by the route loader, or by the router's `hydrate` hook on first load), so
 * `use()` reads it synchronously and the server-rendered content is hydrated
 * as is.
 *
 * If the post chunk is still loading during hydration, the Suspense boundary
 * keeps the server-rendered content while the rest of the page hydrates. If it
 * fails to load, only the post body is replaced by the error fallback.
 */
export const Post = ({ type, slug }: PostProps) => {
  return (
    <ClientErrorBoundary
      fallback={
        <div className="w-full text-center">
          <p>Welp, something went wrong</p>
        </div>
      }
    >
      <Suspense fallback={null}>
        <PostContent type={type} slug={slug} />
      </Suspense>
    </ClientErrorBoundary>
  );
};
