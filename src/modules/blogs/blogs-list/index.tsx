import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { ABSOLUTE_ROUTES } from '@/core/constants/routes';
import { getAllPostSlugsWithMetadata } from '@/core/utils/post';

export const BlogsList = async () => {
  const posts = await getAllPostSlugsWithMetadata('blogs').catch(() => null);

  if (posts?.length === 0) {
    return (
      <div className="w-full text-center">
        <p>Well guess I haven&apos;t written anything yet</p>
      </div>
    );
  }

  const sortedPosts = posts?.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {sortedPosts?.map((post) => (
        <Link
          key={post.metadata.title}
          href={`${ABSOLUTE_ROUTES.BLOGS}/${post.slug}`}
          prefetch
          className="group"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="link-underline text-lg font-medium group-hover:after:w-full">
                  {post.metadata.title}
                </h2>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="text-muted-foreground text-sm">
                {new Date(post.metadata.date).toLocaleDateString()}
              </p>
            </div>
            {post.metadata.summary && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {post.metadata.summary}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
