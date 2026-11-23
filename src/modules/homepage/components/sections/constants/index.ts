import { type ProjectItem, type WorkItem } from '../types';

export const WORK_ITEMS: WorkItem[] = [
  {
    company: 'Vyro',
    link: 'https://vyro.ai/',
    role: 'Frontend Engineer',
    period: 'Mar 2024 to present',
    highlights: [
      'Shipped Chatly Web and scaled it to 1M+ MAUs within three months of launch (peaking above 3M); promoted during the launch.',
      'Architected the Chatly and Everask frontends and built the shared design system and reusable component library used across both products.',
      "Built the real-time LLM chat layer over server-sent events, with a streaming parser that renders model output into typed React components, now the chat foundation across Vyro's AI products.",
      'Built the Film Studio frontend, the agentic video editor and core parts of the v2.0 redesign for Imagine.art.',
      "Improved performance on media-heavy pages: cut Imagine.art's initial load by ~3 MB, added lazy loading, request cancellation and Speculation Rules API prefetching, and replaced dnd-kit with a native drag-and-drop system.",
      'Reviewed code, mentored engineers, onboarded new hires, and interviewed candidates for the team.',
    ],
  },
];

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    title: 'BetterConfig',
    link: 'https://betterconfig.dev',
    subtitle: 'Remote config and feature flags on the edge.',
    summary:
      'Designed and built BetterConfig end to end, an edge-native platform for managing typed configuration and feature flags, then reading them at runtime through a low-latency SDK.',
    details: [
      'The whole system runs on the Cloudflare edge and is split along a strict write/read seam: a Next.js 16 dashboard backed by a Hono control-plane worker that owns the source of truth in D1 via Drizzle, plus a dependency-light read worker that serves published config straight from KV with no database on the hot path.',
      'Added usage metering with Analytics Engine, better-auth sessions with role-based access control, hashed bearer-token auth, dual-key rate limiting, and Polar billing, with a single Zod contract shared across every app in the stack.',
      'It all lives in a pnpm and Turborepo monorepo, with a typed React SDK that supports live refresh and CLI type generation.',
    ],
    detailsLabel: 'How it is built',
    stack: [
      'Cloudflare Workers',
      'Hono',
      'D1 + Drizzle',
      'KV',
      'Next.js 16',
      'Zod',
      'Turborepo',
    ],
  },
  {
    title: 'Imagine.art',
    link: 'https://www.imagine.art',
    subtitle: 'AI generation platform.',
    summary:
      'Built the entire Film Studio frontend, a flagship AI video-creation feature powered by Kling and Seedance 2.0: users generate images, arrange them on a scene-and-shot timeline with audio blocks, and produce videos with transitions.',
    details: [
      'Orchestrated the Film Studio image-to-video pipeline client-side, with model independence built in, and modeled the project/scene/shot state with fractional positioning and scene-to-asset linking.',
      "Built the agentic video editor for Computer, an Imagine.art sub-product, and shipped it into Chatly as well: ported FreeCut, an open-source browser video editor, redesigned it on Vyro's design system with added features, and let users prompt an AI agent to make the edits.",
      'Built core parts of the Imagine.art redesign (v2.0): set up the foundation, implemented the subscription flow and responsive layouts, and addressed user pain points with new flows such as multi-select for asset management.',
      'Tightened rendering performance on media-heavy pages with React.memo, IntersectionObserver-based lazy loading, and cancellation of in-flight media requests, and replaced dnd-kit with a native drag-and-drop architecture with multi-select, built as a reusable component system.',
      'Cut the initial load by ~3 MB by dynamically importing jszip and other feature-specific components and moving SVGs and icons to a CDN; added route prefetching and Speculation Rules API navigation between the main app and Computer workflows.',
    ],
    detailsLabel: 'What I worked on',
    stack: [
      'Video timeline',
      'Image-to-video pipeline',
      'Native drag-and-drop',
      'Speculation Rules API',
    ],
    stats: [{ value: '~3 MB', label: 'cut from the initial load' }],
  },
  {
    title: 'Chatly',
    link: 'https://chatlyai.app/',
    subtitle: 'All-in-one AI chat platform.',
    summary:
      'Shipped Chatly Web and scaled it to 1M+ MAUs within three months of launch, driving funnel conversion and activation improvements.',
    details: [
      'Architected the Chatly and Everask frontends and built the shared design system and reusable component library used across both products.',
      "Built a real-time LLM chat layer over server-sent events, including a custom streaming parser that renders model output into typed React components, now the chat foundation across Vyro's AI products.",
      'Shipped the agentic video editor built for Imagine.art Computer into Chatly as well.',
    ],
    detailsLabel: 'What I worked on',
    stack: ['React', 'SSE streaming', 'Streaming parser', 'Design system'],
    stats: [
      { value: '1M+', label: 'MAUs within three months' },
      { value: '3M+', label: 'peak MAUs' },
    ],
  },
];
