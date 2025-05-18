import { type Metadata } from "next";

import { getAllPostSlugsWithMetadata } from "@/core/utils/post";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const { metadata } = await import(`@/posts/recipes/${slug}.mdx`);
  return {
    title: metadata.title,
    authors: [{ name: "Waleed" }],
    description: metadata.summary,
    keywords: ["Recipes", "waleed", "waleed.dev", ...(metadata.keywords || [])],
    category: metadata.category ?? "Recipe",
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
    },
  };
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const { default: Post } = await import(`@/posts/recipes/${slug}.mdx`);

  return <Post />;
};

export const generateStaticParams = async () => {
  const posts = await getAllPostSlugsWithMetadata("recipes");

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export default Page;
