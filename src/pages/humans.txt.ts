// src/pages/humans.txt.ts
import type { APIRoute } from 'astro';
import { SITE, ORG } from '@/consts';

export const GET: APIRoute = () => {
  const humansTxt = `
/* TEAM */
Project: ${SITE.name} (${SITE.tagline})
Creator: ${ORG.name} (Bima Akbar)
Contact: ${SITE.email}
GitHub: https://github.com/bimaakbar-dev
Location: Riau, Indonesia

/* SITE */
Last update: ${new Date().toISOString().split('T')[0]}
Language: ${SITE.lang}
Doctype: HTML5
Engine: Astro, Vite, Hono (Cloudflare Pages)
IDE: VSCode, TypeScript

/* THANKS TO */
Community modders, anime fans, and open-source contributors.
`.trim();

  return new Response(humansTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};