import fontLatinUrl from '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2?url';

import { SITE_URL } from '@/core/constants/site';

const TITLE = 'Waleed';
const DESCRIPTION =
  'Software engineer building web products end to end, mostly on the frontend: application architecture, design systems and performance for AI products.';
const SOCIAL_TITLE = 'Waleed | Software Engineer';
const SOCIAL_IMAGE_ALT = 'Waleed, software engineer';

// Share images are generated at build time by plugins/og-images.mts
const SOCIAL_IMAGE_WIDTH = '1200';
const SOCIAL_IMAGE_HEIGHT = '630';

/**
 * Browser toolbar color on phones. It matches --background in the default
 * (dark) theme; ThemeColorMeta updates it when the theme changes.
 */
export const THEME_COLORS = {
  dark: '#020202',
  light: '#fcfaf6',
} as const;

// Pages that have their own share image: the lists and every post
const PAGE_WITH_IMAGE = /^\/(?:blogs|recipes)(?:\/[\w-]+)?$/;

const normalizePath = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

const shareImageUrl = (pathname: string) =>
  `${SITE_URL}/og${PAGE_WITH_IMAGE.test(pathname) ? pathname : '/home'}.png`;

/**
 * Head of the root route for the page at `pathname`. Child routes override
 * tags with the same name or property (post pages set their own title,
 * description and image alt).
 */
export const getRootHead = (pathname: string) => {
  const path = normalizePath(pathname);
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const image = shareImageUrl(path);

  return {
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'author', content: 'Waleed' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: THEME_COLORS.dark },
      { property: 'og:site_name', content: 'waleed.dev' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: SOCIAL_TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: SOCIAL_IMAGE_WIDTH },
      { property: 'og:image:height', content: SOCIAL_IMAGE_HEIGHT },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:alt', content: SOCIAL_IMAGE_ALT },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: SOCIAL_TITLE },
      { name: 'twitter:description', content: DESCRIPTION },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: SOCIAL_IMAGE_ALT },
    ],
    links: [
      { rel: 'canonical', href: url },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Waleed: blogs and recipes',
        href: `${SITE_URL}/rss.xml`,
      },
      // The latin subset of the variable font covers every weight used above
      // the fold, so a single preload is enough.
      {
        rel: 'preload',
        href: fontLatinUrl,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous' as const,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  };
};
