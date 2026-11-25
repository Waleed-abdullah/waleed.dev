import '@/styles/fonts.css';
import '@/styles/globals.css';

import { createRootRoute } from '@tanstack/react-router';

import { NotFoundPage } from '@/modules/not-found-page';
import { RootLayout } from '@/modules/root-layout';
import { getRootHead } from '@/modules/root-layout/head';

export const Route = createRootRoute({
  // The deepest match is the page being rendered
  head: ({ matches }) => getRootHead(matches.at(-1)?.pathname ?? '/'),
  shellComponent: RootLayout,
  notFoundComponent: NotFoundPage,
});
