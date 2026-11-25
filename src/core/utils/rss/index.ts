import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { SITE_URL } from '@/core/constants/site';
import { getPostsByDate, type PostsType } from '@/core/utils/post';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const POST_ROUTES: Record<PostsType, string> = {
  blogs: ABSOLUTE_ROUTES.BLOGS,
  recipes: ABSOLUTE_ROUTES.RECIPES,
};

const POST_CATEGORIES: Record<PostsType, string> = {
  blogs: 'Blog',
  recipes: 'Recipe',
};

/** RSS 2.0 feed of every blog and recipe, newest first. */
export const buildRssFeed = () => {
  const posts = (['blogs', 'recipes'] as const)
    .flatMap((type) => getPostsByDate(type).map((post) => ({ ...post, type })))
    .sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));

  const items = posts
    .map(({ slug, type, metadata }) => {
      const url = `${SITE_URL}${POST_ROUTES[type]}/${slug}`;
      return [
        '<item>',
        `<title>${escapeXml(metadata.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(metadata.summary)}</description>`,
        `<category>${escapeXml(metadata.category ?? POST_CATEGORIES[type])}</category>`,
        `<pubDate>${new Date(metadata.date).toUTCString()}</pubDate>`,
        '</item>',
      ].join('\n');
    })
    .join('\n');

  const lastBuildDate = posts[0]
    ? new Date(posts[0].metadata.date).toUTCString()
    : new Date().toUTCString();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '<title>Waleed</title>',
    `<link>${SITE_URL}</link>`,
    '<description>Blogs and recipes by Waleed</description>',
    '<language>en</language>',
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>`,
    items,
    '</channel>',
    '</rss>',
    '',
  ].join('\n');
};
