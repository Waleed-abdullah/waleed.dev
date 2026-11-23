import { ClientErrorBoundary } from '@/core/components/error-boundary';
import { PageHeader } from '@/core/components/page-header';
import { type Post } from '@/core/utils/post';

import { BlogsList } from './blogs-list';

const FEYNMAN_INFO_LINK =
  'https://www.todoist.com/inspiration/feynman-technique';

interface BlogsProps {
  posts: Post[];
}

export const Blogs = ({ posts }: BlogsProps) => {
  return (
    <div className="mx-auto flex w-full max-w-[36rem] flex-col gap-8 sm:gap-10">
      <PageHeader title="Blogs">
        I write about what i learn and do, (trynna embody the{' '}
        <a
          className="decoration-muted-foreground hover:decoration-foreground hover:text-foreground focus-visible:ring-ring rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          href={FEYNMAN_INFO_LINK}
          target="_blank"
          rel="noopener"
        >
          Feynman technique
        </a>
        ) maybe sometimes I will write blogs on random stuff
      </PageHeader>
      <ClientErrorBoundary
        fallback={
          <div className="w-full text-center">
            <p>Welp, something went wrong</p>
          </div>
        }
      >
        <BlogsList posts={posts} />
      </ClientErrorBoundary>
    </div>
  );
};
