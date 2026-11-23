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

import { postMetadata } from './plugins/post-metadata.mts';
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
  // Keep the trailing newline so blocks end with an empty line, as before.
  stripEndNewline: false,
  transformers: [
    {
      name: 'code-block-markers',
      // Keep the raw code on the <pre> so the copy button can copy it.
      pre(node) {
        node.properties['data-raw'] = this.source;
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
  plugins: [
    postMetadata(),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@/mdx-components',
        remarkPlugins: [remarkMdxRsListSpread],
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
      ],
    }),
    nitro(),
    viteReact(),
  ],
});
