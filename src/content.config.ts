//src/content.config.ts
import { 
  defineCollection
} from "astro:content";

import { glob } from "astro/loaders";
import { z } from "astro/zod";

const METADATA = z.object({
  slug: z.string().optional(),
	title: z.string(),
	description: z.string(),
  pubDate: z.coerce.date().optional(),
	lastUpdated: z.coerce.date().optional(),
  cover: z.string().optional(),
});

const SEO = z.object({
  title: z.string(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...METADATA.shape,
    category: z.string().optional(),
    order: z.number().optional(),
    seo: SEO,
  }),
});

const legal = defineCollection({
  loader: glob({ base: "./src/content/legal", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    ...METADATA.shape,
  }),
});

export const collections = {
  docs,
  legal,
};