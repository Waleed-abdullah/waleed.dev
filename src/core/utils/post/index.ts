import 'server-only';

import fs from 'fs';
import path from 'path';

import {
  PostMetadataSchema,
  type PostMetadataSchemaType,
} from '@/core/schemas/posts';

export type PostsType = 'blogs' | 'recipes';

const BLOGS_DIR = path.join(process.cwd(), 'src', 'posts', 'blogs');
const RECIPES_DIR = path.join(process.cwd(), 'src', 'posts', 'recipes');

export const getPostFiles = (type: PostsType) => {
  return fs
    .readdirSync(type === 'blogs' ? BLOGS_DIR : RECIPES_DIR)
    .filter((file) => file.endsWith('.mdx'));
};

export const getPostSlug = (fileName: string) => {
  return fileName.replace(/\.mdx$/, '');
};

// This method is here to ensure that I have correctly defined metadata in the mdx files
export const isValidPostMetadata = (
  metadata: unknown
): metadata is PostMetadataSchemaType =>
  PostMetadataSchema.safeParse(metadata).success;

export const getAllPostSlugsWithMetadata = async (type: PostsType) => {
  const files = getPostFiles(type);

  return await Promise.all(
    files.map(async (fileName) => {
      const slug = getPostSlug(fileName);

      const { metadata } = await import(`@/posts/${type}/${fileName}`);

      if (!isValidPostMetadata(metadata)) {
        throw new Error(`Invalid metadata for ${fileName}`);
      }

      return {
        slug,
        metadata,
      };
    })
  );
};
