// src/pages/feed.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, ROUTES, PAGINATION } from '@/consts';

export const GET: APIRoute = async (context) => {
  const baseUrl = (context.site?.href || SITE.url).replace(/\/$/, '');

  const blog = await getCollection('blog', ({ data }) => !data.draft && !data.seo?.noIndex);
  const docs = await getCollection('docs', ({ data }) => !data.seo?.noIndex);

  const rawItems = [
    ...blog.map(post => ({
      ...post.data,
      url: `${baseUrl}${ROUTES.blog}/${post.data.slug || post.id.replace(/\.(md|mdx)$/, '')}/`,
      date: post.data.pubDate || post.data.lastUpdated || new Date(0),
    })),
    ...docs.map(doc => ({
      ...doc.data,
      url: `${baseUrl}${ROUTES.docs}/${doc.data.slug || doc.id.replace(/\.(md|mdx)$/, '')}/`,
      date: doc.data.pubDate || doc.data.lastUpdated || new Date(0),
    }))
  ];

  const sortedItems = rawItems
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, PAGINATION.postsPerFeed);

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: SITE.name,
    home_page_url: `${baseUrl}/`,
    feed_url: `${baseUrl}${ROUTES.feedJson}`,
    description: SITE.description,
    authors: [
      {
        name: "Bima Akbar",
        url: baseUrl,
      }
    ],
    language: SITE.lang,
    items: sortedItems.map(item => ({
      id: item.url,
      url: item.url,
      title: item.title,
      summary: item.description,
      date_published: new Date(item.date).toISOString(),
      tags: (item.category ? [item.category] : [])
    }))
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};