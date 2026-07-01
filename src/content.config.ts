//src/content.config.ts
import { 
  defineCollection,
  reference
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

const series = defineCollection({
  loader: glob({ base: "./src/content/novels", pattern: "**/series.yml" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['ongoing', 'completed', 'hiatus']),
    cover: z.string(),
  }),
});

const volumes = defineCollection({
  loader: glob({ base: "./src/content/novels", pattern: "**/volume.yml" }),
  schema: z.object({
    title: z.string(),
    cover: z.string(),
    order: z.number(),
    series: reference('series'),
  }),
});

const chapters = defineCollection({
  loader: glob({ base: "./src/content/novels", pattern: "**/!(series|volume).{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    navTitle: z.string().optional(),
    chapterNumber: z.number(),
    volume: reference('volumes'),
    date: z.coerce.date(),
  }),
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
  series,
  volumes,
  chapters,
  docs,
  legal,
};