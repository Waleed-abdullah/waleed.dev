import type { MDXContent } from 'mdx/types';

import {
  PostMetadataSchema,
  type PostMetadataSchemaType,
} from '@/core/schemas/posts';

export type PostsType = 'blogs' | 'recipes';

export interface Post {
  slug: string;
  metadata: PostMetadataSchemaType;
}

export interface PostWithType extends Post {
  type: PostsType;
}

interface PostModule {
  default: MDXContent;
}

// Only the `metadata` export of each post (see the post-metadata plugin in
// vite.config.mts), so listing posts does not pull in their bodies.
const POST_METADATA: Record<PostsType, Record<string, unknown>> = {
  blogs: import.meta.glob('/src/posts/blogs/*.mdx', {
    query: '?metadata',
    import: 'metadata',
    eager: true,
  }),
  recipes: import.meta.glob('/src/posts/recipes/*.mdx', {
    query: '?metadata',
    import: 'metadata',
    eager: true,
  }),
};

// Post bodies, each in its own lazily loaded chunk.
const POST_MODULES: Record<
  PostsType,
  Record<string, () => Promise<PostModule>>
> = {
  blogs: import.meta.glob<PostModule>('/src/posts/blogs/*.mdx'),
  recipes: import.meta.glob<PostModule>('/src/posts/recipes/*.mdx'),
};

const getPostPath = (type: PostsType, slug: string) =>
  `/src/posts/${type}/${slug}.mdx`;

export const getPostSlug = (filePath: string) => {
  return filePath.replace(/^.*\//, '').replace(/\.mdx$/, '');
};

const getPostSlugs = (type: PostsType) => {
  return Object.keys(POST_METADATA[type]).map(getPostSlug).sort();
};

// This method is here to ensure that I have correctly defined metadata in the mdx files
export const isValidPostMetadata = (
  metadata: unknown
): metadata is PostMetadataSchemaType =>
  PostMetadataSchema.safeParse(metadata).success;

export const getPost = (type: PostsType, slug: string): Post | undefined => {
  const path = getPostPath(type, slug);

  if (!Object.hasOwn(POST_METADATA[type], path)) return undefined;

  const metadata = POST_METADATA[type][path];

  if (!isValidPostMetadata(metadata)) {
    throw new Error(`Invalid metadata for ${slug}.mdx`);
  }

  return { slug, metadata };
};

export const getAllPostSlugsWithMetadata = (type: PostsType): Post[] => {
  return getPostSlugs(type).map((slug) => getPost(type, slug) as Post);
};

type PostContentPromise = Promise<MDXContent> & {
  status?: 'fulfilled' | 'rejected';
};

const postContents = new Map<string, PostContentPromise>();

const importPostContent = (type: PostsType, slug: string) => {
  const path = getPostPath(type, slug);
  const importPost = POST_MODULES[type][path];

  // `status`, `value` and `reason` are the fields React's `use()` reads, so a
  // settled promise is read synchronously instead of suspending.
  const promise: PostContentPromise = (
    importPost
      ? importPost()
      : Promise.reject(new Error(`Unknown post ${type}/${slug}`))
  ).then(
    (postModule) => {
      Object.assign(promise, {
        status: 'fulfilled',
        value: postModule.default,
      });
      return postModule.default;
    },
    (error: unknown) => {
      Object.assign(promise, { status: 'rejected', reason: error });
      throw error;
    }
  );

  // The failure is handled where the promise is used (route loader, router
  // hydrate hook, or the error boundary around the post).
  promise.catch(() => {});

  postContents.set(path, promise);

  return promise;
};

/**
 * Starts loading the compiled MDX component of a post, or returns the cached
 * load. A previous failed load is retried. Used by the post route loaders and
 * the router's `hydrate` hook, so the component is loaded before rendering.
 */
export const loadPostContent = (
  type: PostsType,
  slug: string
): Promise<MDXContent> => {
  const cached = postContents.get(getPostPath(type, slug));

  if (cached && cached.status !== 'rejected') return cached;

  return importPostContent(type, slug);
};

/**
 * Returns the cached load of a post's MDX component for rendering with
 * `use()`. Unlike `loadPostContent`, a failed load is not retried here, so
 * the failure reaches the error boundary instead of suspending again on every
 * render.
 */
export const getPostContent = (
  type: PostsType,
  slug: string
): Promise<MDXContent> =>
  postContents.get(getPostPath(type, slug)) ?? importPostContent(type, slug);
