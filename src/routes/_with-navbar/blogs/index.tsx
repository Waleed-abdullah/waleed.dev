import { createFileRoute } from '@tanstack/react-router';

import { getAllPostSlugsWithMetadata } from '@/core/utils/post';
import { Blogs } from '@/modules/blogs';

const Page = () => {
  const posts = Route.useLoaderData();

  return <Blogs posts={posts} />;
};

export const Route = createFileRoute('/_with-navbar/blogs/')({
  loader: () => getAllPostSlugsWithMetadata('blogs'),
  component: Page,
});
