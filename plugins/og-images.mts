import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createProcessor } from '@mdx-js/mdx';
import { Resvg } from '@resvg/resvg-js';
import { toJs } from 'estree-util-to-js';
import satori from 'satori';
import type { Plugin } from 'vite';

import { fbm3 } from '../src/modules/root-layout/terrain-background/noise.ts';
import { getReadingMinutes, type MdastNode } from './mdx-headings.mts';

/**
 * Generates the 1200x630 share images (og:image / twitter:image) into
 * public/og/ when the dev server or a build starts: one for the home page,
 * one per list page and one per post. The root head points each page at its
 * image (src/modules/root-layout/head). public/og/ is git-ignored.
 */

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS_DIR = join(ROOT, 'src/posts');
const OUTPUT_DIR = join(ROOT, 'public/og');

const WIDTH = 1200;
const HEIGHT = 630;

// The dark theme (globals.css .dark), as hex for satori
const COLORS = {
  background: '#020202',
  foreground: '#f2f2f2',
  muted: '#989898',
};

type PostType = 'blogs' | 'recipes';

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  readingMinutes: number;
}

// Reads the self-contained `export const metadata = {...}` literal of a post
const readPost = async (file: string): Promise<PostSummary> => {
  const tree = createProcessor().parse(await readFile(file, 'utf8'));
  let metadata: { title: string; date: string } | undefined;

  for (const node of tree.children) {
    if (node.type !== 'mdxjsEsm' || !node.data?.estree) continue;
    for (const statement of node.data.estree.body) {
      if (
        statement.type !== 'ExportNamedDeclaration' ||
        statement.declaration?.type !== 'VariableDeclaration'
      ) {
        continue;
      }
      for (const declaration of statement.declaration.declarations) {
        if (
          declaration.id.type === 'Identifier' &&
          declaration.id.name === 'metadata' &&
          declaration.init
        ) {
          const code = toJs({
            type: 'Program',
            sourceType: 'module',
            body: [
              { type: 'ExpressionStatement', expression: declaration.init },
            ],
          }).value.replace(/;\s*$/, '');
          // Our own post files, a plain object literal
          metadata = new Function(`return ${code}`)();
        }
      }
    }
  }

  if (!metadata) throw new Error(`No metadata export in ${file}`);

  return {
    slug: basename(file, '.mdx'),
    title: metadata.title,
    date: metadata.date,
    readingMinutes: getReadingMinutes(tree as MdastNode),
  };
};

const readPosts = async (type: PostType) => {
  const dir = join(POSTS_DIR, type);
  const files = (await readdir(dir)).filter((file) => file.endsWith('.mdx'));
  const posts = await Promise.all(
    files.map((file) => readPost(join(dir, file)))
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

// A small number from a string, so each page gets its own terrain
const seedFrom = (value: string) =>
  [...value].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) % 997, 7) /
  10;

// The site's terrain background as an SVG: dots sized by drifting noise,
// fading out from the top like the live background's mask
const terrainSvg = (seed: number) => {
  const spacing = 18;
  const circles: string[] = [];
  const firstX = WIDTH / 2 - Math.ceil(WIDTH / 2 / spacing) * spacing;

  for (let y = spacing / 2; y < HEIGHT; y += spacing) {
    for (let x = firstX; x < WIDTH + spacing; x += spacing) {
      const fadeDistance = Math.hypot(
        (x - WIDTH / 2) / (WIDTH * 0.95),
        y / (HEIGHT * 0.95)
      );
      const fade =
        fadeDistance <= 0.25
          ? 1
          : Math.max(0, 1 - (fadeDistance - 0.25) / 0.75);
      if (fade < 0.02) continue;

      const value = fbm3((x - WIDTH / 2) / 170 + 30, y / 170 + 30, seed);
      const level = Math.min(1, Math.max(0, (value - 0.36) / 0.36));
      const radius = 0.7 + 2.2 * level ** 1.6;
      const opacity = (0.16 + 0.1 * level) * fade;
      circles.push(
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(2)}" fill-opacity="${opacity.toFixed(3)}"/>`
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.foreground}">${circles.join('')}</svg>`;
};

// Minimal element helper for satori (it takes React-element-shaped objects)
type Node = { type: string; props: Record<string, unknown> };
const el = (
  type: string,
  style: Record<string, unknown>,
  children?: Node | string | (Node | string)[],
  props: Record<string, unknown> = {}
): Node => ({ type, props: { style, children, ...props } });

interface CardOptions {
  label: string;
  title: string;
  details: string;
  seed: number;
}

const card = ({ label, title, details, seed }: CardOptions) =>
  el(
    'div',
    {
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      position: 'relative',
      backgroundColor: COLORS.background,
      fontFamily: 'IBM Plex Mono',
    },
    [
      el('img', { position: 'absolute', top: 0, left: 0 }, undefined, {
        src: `data:image/svg+xml;base64,${Buffer.from(terrainSvg(seed)).toString('base64')}`,
        width: WIDTH,
        height: HEIGHT,
      }),
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // Stretch to the card; width/height 100% would add the padding on
          // top and push the bottom row off the image
          flexGrow: 1,
          padding: '64px 72px',
        },
        [
          el(
            'div',
            {
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 24,
              color: COLORS.muted,
              letterSpacing: 1,
            },
            [
              el('div', { display: 'flex' }, `* ${label}`),
              el('div', { display: 'flex' }, 'waleed.dev'),
            ]
          ),
          el('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
            el(
              'div',
              {
                display: 'flex',
                fontSize: title.length > 48 ? 52 : 62,
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: -1,
                color: COLORS.foreground,
              },
              title
            ),
            el(
              'div',
              { display: 'flex', fontSize: 26, color: COLORS.muted },
              details
            ),
          ]),
        ]
      ),
    ]
  );

const loadFonts = async () => {
  const require = createRequire(import.meta.url);
  const fontDir = dirname(
    require.resolve(
      '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'
    )
  );
  const weights = [400, 600] as const;
  return Promise.all(
    weights.map(async (weight) => ({
      name: 'IBM Plex Mono',
      weight,
      style: 'normal' as const,
      data: await readFile(
        join(fontDir, `ibm-plex-mono-latin-${weight}-normal.woff`)
      ),
    }))
  );
};

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? '' : 's'}`;

const generate = async () => {
  const fonts = await loadFonts();
  const [blogs, recipes] = await Promise.all([
    readPosts('blogs'),
    readPosts('recipes'),
  ]);

  const pages: { path: string; options: CardOptions }[] = [
    {
      path: 'home',
      options: {
        label: 'software engineer',
        title: 'Muhammad Waleed Abdullah',
        details: 'Web products, design systems and AI frontends',
        seed: seedFrom('home'),
      },
    },
    {
      path: 'blogs',
      options: {
        label: 'blogs',
        title: 'Blogs',
        details: plural(blogs.length, 'post'),
        seed: seedFrom('blogs'),
      },
    },
    {
      path: 'recipes',
      options: {
        label: 'recipes',
        title: 'Recipes',
        details: plural(recipes.length, 'recipe'),
        seed: seedFrom('recipes'),
      },
    },
    ...(
      [
        ['blogs', 'blog', blogs],
        ['recipes', 'recipe', recipes],
      ] as const
    ).flatMap(([type, label, posts]) =>
      posts.map((post) => ({
        path: `${type}/${post.slug}`,
        options: {
          label,
          title: post.title,
          details: `${formatDate(post.date)} · ${post.readingMinutes} min read`,
          seed: seedFrom(post.slug),
        },
      }))
    ),
  ];

  await Promise.all(
    pages.map(async ({ path, options }) => {
      const svg = await satori(card(options) as Parameters<typeof satori>[0], {
        width: WIDTH,
        height: HEIGHT,
        fonts,
      });
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } })
        .render()
        .asPng();
      const file = join(OUTPUT_DIR, `${path}.png`);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, png);
    })
  );

  return pages.length;
};

export const ogImages = (): Plugin => {
  // buildStart runs once per environment (client, ssr); generate once
  let done: Promise<number> | undefined;

  return {
    name: 'og-images',
    async buildStart() {
      if (done) {
        await done;
        return;
      }
      done = generate();
      this.info?.(`generated ${await done} share images in public/og`);
    },
  };
};
