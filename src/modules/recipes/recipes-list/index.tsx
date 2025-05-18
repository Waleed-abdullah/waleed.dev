import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ABSOLUTE_ROUTES } from "@/core/constants/routes";
import { getAllPostSlugsWithMetadata } from "@/core/utils/post";

export const RecipesList = async () => {
  try {
    const posts = await getAllPostSlugsWithMetadata("recipes");

    if (posts.length === 0) {
      return (
        <div className="w-full text-center">
          <p>Well guess I haven&apos;t made anything yet</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.metadata.title}
            href={`${ABSOLUTE_ROUTES.RECIPES}/${post.slug}`}
            prefetch
            className="group"
          >
            <div className="flex flex-col gap-2">
              {post.metadata.image && (
                <Image
                  src={post.metadata.image}
                  alt="no image"
                  width={100}
                  height={100}
                />
              )}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg link-underline group-hover:after:w-full font-medium">
                    {post.metadata.title}
                  </h2>
                  <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
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
          </Link>
        ))}
      </div>
    );
  } catch {
    return (
      <div className="w-full text-center">
        <p>Welp, something went wrong</p>
      </div>
    );
  }
};
