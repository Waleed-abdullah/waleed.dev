import '@/styles/fonts.css';
import '@/styles/globals.css';

import { createRootRoute } from '@tanstack/react-router';

import { NotFoundPage } from '@/modules/not-found-page';
import { RootLayout } from '@/modules/root-layout';
import { ROOT_HEAD } from '@/modules/root-layout/head';

export const Route = createRootRoute({
  head: () => ROOT_HEAD,
  shellComponent: RootLayout,
  notFoundComponent: NotFoundPage,
});
