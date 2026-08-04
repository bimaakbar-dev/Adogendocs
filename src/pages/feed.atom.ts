// src/pages/feed.atom.ts
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

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE.name}</title>
  <subtitle>${SITE.description}</subtitle>
  <link href="${baseUrl}${ROUTES.feedAtom}" rel="self"/>
  <link href="${baseUrl}/"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${baseUrl}/</id>
  <author>
    <name>Bima Akbar</name>
    <email>${SITE.email}</email>
  </author>
${sortedItems
  .map(
    (item) => `  <entry>
    <title>${item.title}</title>
    <link href="${item.url}"/>
    <id>${item.url}</id>
    <updated>${new Date(item.date).toISOString()}</updated>
    <summary>${item.description}</summary>
  </entry>`
  )
  .join('\n')}
</feed>`;

  return new Response(atomFeed.trim(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
