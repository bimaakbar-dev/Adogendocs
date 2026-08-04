// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, ROUTES, PAGINATION } from '@/consts';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const baseUrl = context.site ?? SITE.url;
  const blog = await getCollection('blog', ({ data }) => !data.draft && !data.seo?.noIndex);
  const docs = await getCollection('docs', ({ data }) => !data.seo?.noIndex);
  const feedItems = [
    ...blog.map((post) => {
      const slug = post.data.slug || post.id.replace(/\.(md|mdx)$/, '');
      return {
        ...post.data,
        url: `${ROUTES.blog}/${slug}/`,
        date: post.data.pubDate || post.data.lastUpdated || new Date(0),
      };
    }),
    ...docs.map((doc) => {
      const slug = doc.data.slug || doc.id.replace(/\.(md|mdx)$/, '');
      return {
        ...doc.data,
        url: `${ROUTES.docs}/${slug}/`,
        date: doc.data.pubDate || doc.data.lastUpdated || new Date(0),
      };
    }),
  ];
  const sortedItems = feedItems.sort((a, b) => b.date.getTime() - a.date.getTime());
  const limitedItems = sortedItems.slice(0, PAGINATION.postsPerFeed);

  return rss({
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    site: baseUrl,
    trailingSlash: true, 
    customData: `
      <language>${SITE.lang}</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro via Unloyd Engine</generator>
    `,
    
    items: limitedItems.map((item) => {
      const categories = (item.category ? [item.category] : []);
      
      return {
        title: item.title,
        pubDate: item.date,
        description: item.description,
        link: item.url,
        author: item.author?.name || SITE.name,
        categories: categories,
      };
    }),
  });
};
