import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { formatPostDate } from '@/core/utils/date';
import { type AdjacentPosts, type PostWithType } from '@/core/utils/post';

import { Post } from '..';
import { PostNavigation } from '../components/post-navigation';
import { TableOfContents } from '../components/table-of-contents';

interface PostPageProps {
  post: PostWithType;
  adjacent: AdjacentPosts;
}

const BACK_LINKS = {
  blogs: { to: ABSOLUTE_ROUTES.BLOGS, label: 'Blogs' },
  recipes: { to: ABSOLUTE_ROUTES.RECIPES, label: 'Recipes' },
} as const;

// The table of contents is only worth showing for posts with some structure.
const MIN_TOC_HEADINGS = 2;

/** Reading view of a blog post or recipe. */
export const PostPage = ({ post, adjacent }: PostPageProps) => {
  const { type, slug, metadata, readingMinutes, headings } = post;
  const backLink = BACK_LINKS[type];
  const hasTableOfContents = headings.length >= MIN_TOC_HEADINGS;

  return (
    <div className="mx-auto grid w-full max-w-[36rem] items-start lg:max-w-none lg:grid-cols-[minmax(0,36rem)_13rem] lg:justify-center lg:gap-16">
      <article className="min-w-0">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10">
          <Link
            to={backLink.to}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -ml-1 inline-flex min-h-11 items-center gap-2 self-start rounded-sm px-1 text-[15px] transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {backLink.label}
          </Link>
          <h1 className="text-[1.625rem] leading-[1.15] font-bold tracking-tight text-balance sm:text-[2.25rem]">
            {metadata.title}
          </h1>
          <p className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px]">
            <time dateTime={metadata.date}>
              {formatPostDate(metadata.date, 'long')}
            </time>
            <span aria-hidden="true">/</span>
            <span>{readingMinutes} min read</span>
          </p>
        </header>

        <Post type={type} slug={slug} />

        <PostNavigation type={type} adjacent={adjacent} />
      </article>

      {hasTableOfContents && (
        <aside className="hidden self-stretch lg:block">
          <TableOfContents headings={headings} />
        </aside>
      )}
    </div>
  );
};
