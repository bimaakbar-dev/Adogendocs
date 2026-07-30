// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/consts';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const blog = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const sortedBlog = blog.sort((a, b) => {
    const dateA = a.data.pubDate ?? new Date(0);
    const dateB = b.data.pubDate ?? new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    title: `Blog | ${SITE.name}`,
    description: SITE.description || 'Latest articles, tutorials and updates.',
    site: context.site ?? SITE.url, 
    trailingSlash: false,
    customData: `<language>${SITE.lang || 'id'}</language>`,
    
    items: sortedBlog.map((post) => {
      const cleanSlug = post.data.slug || post.id.replace(/\.(md|mdx)$/, '');

      return {
        title: post.data.title,
        pubDate: post.data.pubDate ?? new Date(), 
        description: post.data.description,
        link: `/blog/${cleanSlug}`,
        author: post.data.author?.name || SITE.name,
        categories: post.data.tags || (post.data.category ? [post.data.category] : []),
      };
    }),
  });
};
