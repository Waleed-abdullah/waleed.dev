import "server-only";

import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "src", "posts");

export const getPostFiles = () => {
  return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));
};

export const getPostSlug = (fileName: string) => {
  return fileName.replace(/\.mdx$/, "");
};

export const getAllPostSlugsWithMetadata = async () => {
  const files = getPostFiles();

  return await Promise.all(
    files.map(async (fileName) => {
      const slug = getPostSlug(fileName);
      const { metadata } = await import(`@/posts/${fileName}`);

      return {
        slug,
        metadata,
      };
    })
  );
};
