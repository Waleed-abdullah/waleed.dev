import fontLatinUrl from '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2?url';

import { SITE_URL } from '@/core/constants/site';

const TITLE = 'Waleed';
const DESCRIPTION = 'Full Stack Developer who loves Computer Science';
const SOCIAL_TITLE = 'Waleed | Full Stack Developer';
const SOCIAL_DESCRIPTION = 'Full Stack Developer who loves Computer Science.';
const SOCIAL_IMAGE_ALT = 'Waleed | Full Stack Developer - A personal website';
const SOCIAL_IMAGE_SIZE = '96';

const KEYWORDS = [
  'Full Stack Developer',
  'Software Engineer',
  'Web Development',
  'React',
  'Node.js',
  'Next.js',
  'Tailwind CSS',
  'Shadcn UI',
  'JavaScript',
  'TypeScript',
  'Computer Science',
  'Python',
  'Golang',
  'Next.js',
  'RAG',
  'AI',
  'LLM',
  'AI Agent',
  'AI Agentic Development',
  'Portfolio',
];

/**
 * Head of the root route. Child routes override tags with the same name or
 * property.
 */
export const ROOT_HEAD = {
  meta: [
    { charSet: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
    { title: TITLE },
    { name: 'description', content: DESCRIPTION },
    { name: 'author', content: 'Waleed' },
    { name: 'keywords', content: KEYWORDS.join(',') },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: SOCIAL_TITLE },
    { property: 'og:description', content: SOCIAL_DESCRIPTION },
    { property: 'og:image', content: `${SITE_URL}/opengraph-image.png` },
    { property: 'og:image:width', content: SOCIAL_IMAGE_SIZE },
    { property: 'og:image:height', content: SOCIAL_IMAGE_SIZE },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:alt', content: SOCIAL_IMAGE_ALT },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: SOCIAL_TITLE },
    { name: 'twitter:description', content: SOCIAL_DESCRIPTION },
    { name: 'twitter:image', content: `${SITE_URL}/twitter-image.png` },
    { name: 'twitter:image:width', content: SOCIAL_IMAGE_SIZE },
    { name: 'twitter:image:height', content: SOCIAL_IMAGE_SIZE },
    { name: 'twitter:image:type', content: 'image/png' },
    { name: 'twitter:image:alt', content: SOCIAL_IMAGE_ALT },
  ],
  links: [
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
