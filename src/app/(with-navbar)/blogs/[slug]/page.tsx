import { type Metadata } from "next";

import { getAllPostSlugsWithMetadata } from "@/core/utils/blog";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const { metadata } = await import(`@/posts/${slug}.mdx`);
  return {
    title: metadata.title,
    authors: [{ name: "Waleed" }],
    description: metadata.summary,
    keywords: ["blog", "waleed", "waleed.dev", ...(metadata.keywords || [])],
    category: metadata.category ?? "Blog",
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
    },
  };
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  const { default: Post } = await import(`@/posts/${slug}.mdx`);

  return <Post />;
};

export const generateStaticParams = async () => {
  const posts = await getAllPostSlugsWithMetadata();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export default Page;
