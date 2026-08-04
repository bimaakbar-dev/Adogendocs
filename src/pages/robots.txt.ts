// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';
import { SITE, ROUTES, SEO } from '@/consts';

export const GET: APIRoute = ({ site }) => {
  const isIndexable = SEO.robots.index;
  const baseUrl = (site?.href || SITE.url).replace(/\/$/, '');
  const sitemapUrl = `${baseUrl}${ROUTES.sitemap}`;
  const pureHost = baseUrl.replace(/^https?:\/\//, '');

  const robotsTxt = `
User-agent: *
${isIndexable ? 'Allow: /' : 'Disallow: /'}

# Hindari Crawling pada Direktori Internal & Error
Disallow: /api/
Disallow: /404/
Disallow: /_astro/

# Perlindungan SEO: Cegah indexing pada URL dengan Parameter (Duplicate Content)
Disallow: /*?*
Disallow: /*.json$

# ----------------------------------------------------
# (Opsional) BLOKIR AI CRAWLERS / SCRAPERS
# ----------------------------------------------------
# User-agent: GPTBot
# Disallow: /
# User-agent: ChatGPT-User
# Disallow: /
# User-agent: CCBot
# Disallow: /
# User-agent: anthropic-ai
# Disallow: /

# Sitemap Resmi
Sitemap: ${sitemapUrl}

# Direktif khusus untuk Yandex
Host: ${pureHost}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Cache yang lebih panjang karena robots.txt sangat jarang berubah
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
