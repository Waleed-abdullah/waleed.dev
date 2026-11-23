# waleed.dev

Personal site and blog, built with [TanStack Start](https://tanstack.com/start) (Vite, TanStack Router), React 19, Tailwind CSS 4 and MDX.

## Requirements

- Node.js `^20.19.0 || >=22.12.0` (required by Vite 8)

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server runs on [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `pnpm dev`       | Start the Vite dev server on port 3000                                                        |
| `pnpm build`     | Build the client and server, and prerender every page into `.output/`                         |
| `pnpm start`     | Serve the production build with `node .output/server/index.mjs` (server-renders each request) |
| `pnpm lint`      | Run ESLint                                                                                    |
| `pnpm typecheck` | Run `tsc --noEmit`                                                                            |

## Project Structure

- `src/routes/` - file-based routes (TanStack Router)
- `src/modules/` - feature modules used by the routes
- `src/core/` - shared components, utilities, constants, schemas and types
- `src/posts/` - blog posts and recipes written in MDX
- `src/styles/` - global CSS and fonts
- `plugins/` - build plugins used by `vite.config.mts`
- `public/` - static files (favicon, social images, resume, recipe images)

## Writing Posts

Add an `.mdx` file to `src/posts/blogs/` or `src/posts/recipes/`. Each file exports its metadata:

```js
export const metadata = {
  title: 'Post title',
  date: '2025-08-04',
  summary: 'One line summary',
  keywords: ['optional', 'keywords'],
  category: 'Optional category',
  image: '/images/optional-image.gif',
};
```

- `keywords`, `category` and `image` are optional. `category` defaults to `Blog` or `Recipe` in the page meta tags. `image` is a path to a file in `public/`; it is shown on the recipe card.
- `metadata` must be a self-contained literal: `export const metadata = {...}` with only literal values. It cannot reference imports or other bindings, because the build reads it on its own, without the rest of the post (see `plugins/post-metadata.mts`).
- The metadata is validated with Zod at build time.

Fenced code blocks are highlighted at build time with Shiki. New posts are picked up automatically by the lists, the post routes and the sitemap.

## Deployment

The site is deployed on Vercel. The Nitro Vite plugin detects the Vercel build environment and writes the Vercel Build Output (`.vercel/output`), including the prerendered pages, which Vercel serves as static files. Requests without a prerendered page (for example unknown URLs, which return 404) go to the server function.

Locally, `pnpm start` server-renders each request. The prerendered HTML in `.output/public` is not used by the local server because Start prerenders after Nitro has listed its static assets.
