//src/content.config.ts

import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const novels = defineCollection({
  loader: glob({ base: "./src/content/novels", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    novelTitle: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    order: z.number(),
    cover: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    volume: z.string().optional(),
    author: z.string().default("C0desk1"),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    pubDate: z.coerce.date(),
    order: z.number().optional(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ base: "./src/content/legal", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

export const collections = {
  novels,
  docs,
  legal,
};
