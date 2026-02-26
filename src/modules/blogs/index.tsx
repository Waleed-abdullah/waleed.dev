import Link from 'next/link';

import { ClientErrorBoundary } from '@/core/components/error-boundary';

import { BlogsList } from './blogs-list';

const FEYNMAN_INFO_LINK =
  'https://www.todoist.com/inspiration/feynman-technique';

export const Blogs = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="flex gap-1 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-muted-foreground">*</span> <p>Blogs</p>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          I write about what i learn and do, (trynna embody the{' '}
          <Link className="underline" href={FEYNMAN_INFO_LINK} target="_blank">
            Feynman technique
          </Link>
          ) maybe sometimes I will write blogs on random stuff
        </p>
      </div>
      <ClientErrorBoundary
        fallback={
          <div className="w-full text-center">
            <p>Welp, something went wrong</p>
          </div>
        }
      >
        <BlogsList />
      </ClientErrorBoundary>
    </div>
  );
};
