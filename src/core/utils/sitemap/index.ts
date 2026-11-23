import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { SITE_URL } from '@/core/constants/site';
import { getAllPostSlugsWithMetadata } from '@/core/utils/post';

interface SitemapEntry {
  path: string;
  priority: number;
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const buildSitemap = () => {
  const lastModified = new Date().toISOString();

  const entries: SitemapEntry[] = [
    { path: ABSOLUTE_ROUTES.ROOT, priority: 1 },
    { path: ABSOLUTE_ROUTES.BLOGS, priority: 1 },
    { path: ABSOLUTE_ROUTES.RECIPES, priority: 1 },
    ...getAllPostSlugsWithMetadata('blogs').map((blog) => ({
      path: `${ABSOLUTE_ROUTES.BLOGS}/${blog.slug}`,
      priority: 0.8,
    })),
    ...getAllPostSlugsWithMetadata('recipes').map((recipe) => ({
      path: `${ABSOLUTE_ROUTES.RECIPES}/${recipe.slug}`,
      priority: 0.8,
    })),
  ];

  const urls = entries
    .map(
      ({ path, priority }) =>
        `<url>\n<loc>${escapeXml(`${SITE_URL}${path}`)}</loc>\n<lastmod>${lastModified}</lastmod>\n<priority>${priority}</priority>\n</url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
