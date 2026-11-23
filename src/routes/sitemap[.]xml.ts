import { createFileRoute } from '@tanstack/react-router';

import { buildSitemap } from '@/core/utils/sitemap';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: {
            'Content-Type': 'application/xml',
          },
        }),
    },
  },
});
