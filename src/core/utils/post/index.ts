import type { MDXContent } from 'mdx/types';

import {
  PostMetadataSchema,
  type PostMetadataSchemaType,
} from '@/core/schemas/posts';

export type PostsType = 'blogs' | 'recipes';

/** An h2 or h3 heading of a post, with the id it has in the rendered post. */
export interface PostHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadataSchemaType;
  readingMinutes: number;
  headings: PostHeading[];
}

export interface PostWithType extends Post {
  type: PostsType;
}

/** The newer and older neighbours of a post, by date. */
export interface AdjacentPosts {
  newer?: { slug: string; title: string };
  older?: { slug: string; title: string };
}

interface PostModule {
  default: MDXContent;
}

interface PostMetadataModule {
  metadata: unknown;
  readingMinutes: number;
  headings: PostHeading[];
}

// Only the `metadata` export of each post plus values computed from its body
// (see plugins/post-metadata.mts), so listing posts does not pull in bodies.
const POST_METADATA: Record<PostsType, Record<string, PostMetadataModule>> = {
  blogs: import.meta.glob<PostMetadataModule>('/src/posts/blogs/*.mdx', {
    query: '?metadata',
    eager: true,
  }),
  recipes: import.meta.glob<PostMetadataModule>('/src/posts/recipes/*.mdx', {
    query: '?metadata',
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

  const { metadata, readingMinutes, headings } = POST_METADATA[type][path];

  if (!isValidPostMetadata(metadata)) {
    throw new Error(`Invalid metadata for ${slug}.mdx`);
  }

  return { slug, metadata, readingMinutes, headings };
};

export const getAllPostSlugsWithMetadata = (type: PostsType): Post[] => {
  return getPostSlugs(type).map((slug) => getPost(type, slug) as Post);
};

/** Posts of a type, newest first. */
export const getPostsByDate = (type: PostsType): Post[] => {
  return getAllPostSlugsWithMetadata(type).sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
};

export const getAdjacentPosts = (
  type: PostsType,
  slug: string
): AdjacentPosts => {
  const posts = getPostsByDate(type);
  const index = posts.findIndex((post) => post.slug === slug);
  const toLink = (post?: Post) =>
    post && { slug: post.slug, title: post.metadata.title };

  if (index === -1) return {};

  return { newer: toLink(posts[index - 1]), older: toLink(posts[index + 1]) };
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
