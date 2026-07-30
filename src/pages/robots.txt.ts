// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';
import { SITE, ROUTES, SEO } from '@/consts';

export const GET: APIRoute = ({ site }) => {
  const isIndexable = SEO.robots.index;
  const sitemapUrl = new URL(ROUTES.sitemap, site ?? SITE.url).href;
  const robotsTxt = `
User-agent: *
${isIndexable ? 'Allow: /' : 'Disallow: /'}

Disallow: /api/
Disallow: /404

Sitemap: ${sitemapUrl}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
