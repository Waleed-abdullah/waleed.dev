import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ABSOLUTE_ROUTES } from "@/core/constants/routes";
import { getAllPostSlugsWithMetadata } from "@/core/utils/blog";

export const BlogsList = async () => {
  try {
    const posts = await getAllPostSlugsWithMetadata();

    if (posts.length === 0) {
      return (
        <div className="w-full text-center">
          <p>Well guess I haven&apos;t written anything yet</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.metadata.title}
            className="flex flex-col gap-2 group cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <Link
                href={`${ABSOLUTE_ROUTES.BLOGS}/${post.slug}`}
                className="text-center flex items-center gap-2 group link-underline"
              >
                <h2 className="text-lg font-medium">{post.metadata.title}</h2>
                <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-sm text-muted-foreground">
                {new Date(post.metadata.date).toLocaleDateString()}
              </p>
            </div>
            {post.metadata.summary && (
              <p className="text-sm text-muted-foreground">
                {post.metadata.summary}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="w-full text-center">
        <p>Welp, something went wrong</p>
      </div>
    );
  }
};
