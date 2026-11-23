import type { Post } from '@/core/utils/post';

interface PostHeadOptions {
  /** Keyword placed before the default keywords, e.g. 'blog' */
  keyword: string;
  /** Category used when the post does not define one */
  defaultCategory: string;
}

/**
 * Meta tags of a post page. They override the matching tags of the root route.
 */
export const getPostHeadMeta = (
  { metadata }: Post,
  { keyword, defaultCategory }: PostHeadOptions
) => [
  { title: metadata.title },
  { name: 'description', content: metadata.summary },
  { name: 'author', content: 'Waleed' },
  {
    name: 'keywords',
    content: [
      keyword,
      'waleed',
      'waleed.dev',
      ...(metadata.keywords || []),
    ].join(','),
  },
  { name: 'category', content: metadata.category ?? defaultCategory },
  { property: 'og:title', content: metadata.title },
  { property: 'og:description', content: metadata.summary },
];
