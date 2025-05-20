import './globals.css';

import type { Metadata, Viewport } from 'next';

import type { PropsWithChildren } from '@/core/types/common';
import { RootLayout } from '@/modules/root-layout';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Waleed',
  description: 'Full Stack Developer who loves Computer Science',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'Web Development',
    'React',
    'Node.js',
    'Next.js',
    'Tailwind CSS',
    'Shadcn UI',
    'JavaScript',
    'TypeScript',
    'Computer Science',
    'Python',
    'Golang',
    'Next.js',
    'RAG',
    'AI',
    'LLM',
    'AI Agent',
    'AI Agentic Development',
    'Portfolio',
  ],
  authors: [{ name: 'Waleed' }],
  openGraph: {
    title: 'Waleed | Full Stack Developer',
    description: 'Full Stack Developer who loves Computer Science.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waleed | Full Stack Developer',
    description: 'Full Stack Developer who loves Computer Science.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return <RootLayout>{children}</RootLayout>;
}
