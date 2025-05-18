import { z } from "zod";

export const PostMetadataSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string(),
  keywords: z.array(z.string()).optional(),
  category: z.string().optional(),
  image: z.string().optional(),
});

export type PostMetadataSchemaType = z.infer<typeof PostMetadataSchema>;
