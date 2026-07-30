// src/pages/sitemap-index.xml.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, ROUTES } from '@/consts';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.href || SITE.url;

  const blog = await getCollection('blog', ({ data }) => !data.draft && !data.seo?.noIndex);
  const docs = await getCollection('docs', ({ data }) => !data.seo?.noIndex);
  const legal = await getCollection('legal'); 

  const urls: { loc: string; lastmod?: string }[] = [];

  const staticRoutes = [
    ROUTES.home,
    ROUTES.docs,
    ROUTES.blog,
    ROUTES.archive,
  ];

  staticRoutes.forEach((route) => {
    urls.push({ loc: new URL(route, baseUrl).href });
  });

  blog.forEach((post) => {
    const slug = post.data.slug || post.id.replace(/\.(md|mdx)$/, '');
    const date = post.data.lastUpdated || post.data.pubDate;
    
    urls.push({
      loc: new URL(`/blog/${slug}`, baseUrl).href,
      lastmod: date ? new Date(date).toISOString() : undefined,
    });
  });

  docs.forEach((doc) => {
    const slug = doc.data.slug || doc.id.replace(/\.(md|mdx)$/, '');
    const date = doc.data.lastUpdated || doc.data.pubDate;
    
    urls.push({
      loc: new URL(`/docs/${slug}`, baseUrl).href,
      lastmod: date ? new Date(date).toISOString() : undefined,
    });
  });

  legal.forEach((item) => {
    const slug = item.data.slug || item.id.replace(/\.(md|mdx)$/, '');
    const date = item.data.lastUpdated || item.data.pubDate;
    
    urls.push({
      loc: new URL(`/legal/${slug}`, baseUrl).href,
      lastmod: date ? new Date(date).toISOString() : undefined,
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>${
      url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
