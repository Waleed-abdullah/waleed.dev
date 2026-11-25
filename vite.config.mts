import { statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import mdx from '@mdx-js/rollup';
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

import { ogImages } from './plugins/og-images.mts';
import { postMetadata } from './plugins/post-metadata.mts';
import { remarkHeadingIds } from './plugins/remark-heading-ids.mts';
import { remarkMdxRsListSpread } from './plugins/remark-mdx-rs-list-spread.mts';

const PUBLIC_DIR = fileURLToPath(new URL('./public', import.meta.url));

// True when the URL path points to a file in public/ (e.g. the resume PDF).
const isPublicFile = (urlPath: string) => {
  const file = join(PUBLIC_DIR, decodeURIComponent(urlPath.split(/[?#]/)[0]));

  if (!file.startsWith(`${PUBLIC_DIR}/`)) return false;

  try {
    return statSync(file).isFile();
  } catch {
    return false;
  }
};

const shikiOptions: RehypeShikiOptions = {
  themes: {
    light: 'one-light',
    dark: 'slack-dark',
  },
  langs: [],
  lazy: true,
  mergeWhitespaces: true,
  transformers: [
    {
      name: 'code-block-markers',
      // Keep the raw code on the <pre> so the copy button can copy it, and
      // the language for the code block header.
      pre(node) {
        node.properties['data-raw'] = this.source;
        node.properties['data-language'] = this.options.lang;
      },
      // Mark the <code> of a highlighted block so it does not get the
      // inline code styles (see src/mdx-components.tsx).
      code(node) {
        node.properties['data-code-block'] = '';
      },
    },
  ],
};

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    // Only imported by lazily loaded recipe posts. Pre-bundling them up front
    // stops the dev server from re-optimizing (and reloading the page, with
    // duplicate React errors) the first time one of those posts is opened.
    include: [
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toggle-group',
    ],
  },
  plugins: [
    ogImages(),
    postMetadata(),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@/mdx-components',
        remarkPlugins: [remarkMdxRsListSpread, remarkHeadingIds],
        rehypePlugins: [[rehypeShiki, shikiOptions]],
      }),
    },
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Crawling follows every internal <a href>. Static files from public/
        // (e.g. the resume PDF) must be served as is, not prerendered.
        filter: ({ path }) => !isPublicFile(path),
      },
      pages: [
        {
          path: '/sitemap.xml',
          prerender: { enabled: true, outputPath: '/sitemap.xml' },
        },
        {
          path: '/rss.xml',
          prerender: { enabled: true, outputPath: '/rss.xml' },
        },
      ],
    }),
    nitro(),
    viteReact(),
  ],
});
