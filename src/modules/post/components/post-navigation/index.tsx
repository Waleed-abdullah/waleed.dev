import { Link } from '@tanstack/react-router';

import { cn } from '@/core/lib/cn';
import { type AdjacentPosts, type PostsType } from '@/core/utils/post';

interface PostNavigationProps {
  type: PostsType;
  adjacent: AdjacentPosts;
}

const POST_ROUTES = {
  blogs: '/blogs/$slug',
  recipes: '/recipes/$slug',
} as const;

const NOUNS = { blogs: 'post', recipes: 'recipe' } as const;

/** Links to the newer and older post of the same type. */
export const PostNavigation = ({ type, adjacent }: PostNavigationProps) => {
  const links = [
    { label: `Older ${NOUNS[type]}`, post: adjacent.older, align: 'start' },
    { label: `Newer ${NOUNS[type]}`, post: adjacent.newer, align: 'end' },
  ] as const;

  if (!adjacent.older && !adjacent.newer) return null;

  return (
    <nav
      aria-label={`More ${type}`}
      className="border-border mt-14 grid gap-4 border-t pt-8 sm:grid-cols-2 sm:gap-8"
    >
      {links.map(({ label, post, align }) =>
        post ? (
          <Link
            key={label}
            to={POST_ROUTES[type]}
            params={{ slug: post.slug }}
            className={cn(
              'group hover:bg-muted/60 focus-visible:ring-ring -mx-3 flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors focus-visible:ring-2 focus-visible:outline-none',
              align === 'end' && 'sm:col-start-2 sm:items-end sm:text-right'
            )}
          >
            <span className="text-muted-foreground font-mono text-xs tracking-[0.08em] uppercase">
              {label}
            </span>
            <span className="leading-snug font-semibold">
              <span className="link-underline link-underline-group">
                {post.title}
              </span>
            </span>
          </Link>
        ) : null
      )}
    </nav>
  );
};
