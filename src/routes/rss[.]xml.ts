import { createFileRoute } from '@tanstack/react-router';

import { buildRssFeed } from '@/core/utils/rss';

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRssFeed(), {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
          },
        }),
    },
  },
});
