import { Link } from '@tanstack/react-router';

import { formatPostDate } from '@/core/utils/date';
import { type Post } from '@/core/utils/post';

interface BlogsListProps {
  posts: Post[];
}

export const BlogsList = ({ posts }: BlogsListProps) => {
  if (posts.length === 0) {
    return (
      <div className="w-full text-center">
        <p>Well guess I haven&apos;t written anything yet</p>
      </div>
    );
  }

  const sortedPosts = [...posts].sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  return (
    <ul className="-mx-3 flex flex-col">
      {sortedPosts.map((post) => (
        <li key={post.slug}>
          <Link
            to="/blogs/$slug"
            params={{ slug: post.slug }}
            className="group hover:bg-muted/60 focus-visible:ring-ring flex flex-col gap-1 rounded-lg px-3 py-3.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="text-base leading-snug font-semibold sm:text-[17px]">
                <span className="link-underline link-underline-group">
                  {post.metadata.title}
                </span>
              </span>
              <time
                dateTime={post.metadata.date}
                className="text-muted-foreground font-mono text-[13px]"
              >
                {formatPostDate(post.metadata.date)}
              </time>
            </span>
            {post.metadata.summary && (
              <span className="text-muted-foreground text-[15px] leading-relaxed">
                {post.metadata.summary}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};
