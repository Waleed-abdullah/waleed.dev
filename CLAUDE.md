# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

No test framework is configured. Pre-commit hook runs `pnpm lint`; commit-msg hook enforces conventional commits via commitlint.

## Architecture

This is a **Next.js 16 App Router** portfolio/blog site (waleed.dev) using React 19, TypeScript, Tailwind CSS 4, and MDX for content.

### Source Layout (`src/`)

- **`app/`** — Next.js routes. Uses a `(with-navbar)` route group for pages that share the navbar/footer layout. Dynamic routes: `blogs/[slug]` and `recipes/[slug]`.
- **`modules/`** — Feature modules (homepage, blogs, recipes, navbar-layout, root-layout, coming-soon-page). Each module owns its components and logic.
- **`core/`** — Shared code: UI components (`core/components/ui/`), utilities (`core/lib/cn/` for clsx+twMerge), constants (routes, external links, hotkeys), hooks, icons, schemas, and types.
- **`posts/`** — MDX content files for blogs (`posts/blogs/`) and recipes (`posts/recipes/`). Each `.mdx` file exports a `metadata` object validated by Zod (`core/schemas/posts/`).
- **`mdx-components.tsx`** — Custom MDX component overrides (headings, code blocks with Shiki, images, links).

### Content System

Posts are loaded at build time via file-system scanning (`core/utils/post/`). Each MDX file exports metadata (`title`, `date`, `summary`, optional `keywords`/`category`/`image`). Pages use `generateStaticParams()` with `dynamicParams: false` for static generation.

### Key Patterns

- **Path alias:** `@/*` maps to `src/*`
- **UI components** built on Radix UI primitives with CVA for variants
- **Theme:** `next-themes` with CSS class strategy (`.dark`), OKLch color variables in `globals.css`
- **Animations:** Motion (Framer Motion) library
- **Server components** by default; `server-only` used to guard server-side post utilities

## Code Conventions

- **Imports:** `eslint-plugin-simple-import-sort` enforced — externals first, then `@/*` absolute, then relative
- **Type imports:** Inline `import type { ... }` enforced by ESLint
- **File naming:** kebab-case directories with `index.tsx` entry points
- **Component naming:** PascalCase
- **Formatting:** Prettier with single quotes, trailing commas (ES5), tab width 2, Tailwind class sorting plugin
- **Commits:** Conventional commits required (commitlint)
