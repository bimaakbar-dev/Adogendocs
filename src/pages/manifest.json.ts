// src/pages/manifest.json.ts
import type { APIRoute } from 'astro';
import { SITE, IMAGE } from '@/consts';

export const GET: APIRoute = () => {
  const manifest = {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: SITE.bgColor,
    theme_color: SITE.themeColor,
    lang: SITE.lang,
    dir: SITE.dir,
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
