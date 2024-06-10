import { getAllPost } from '@/app/actions';

const siteUrl = process.env.SITE_URL!;
export const runtime = 'edge';
const createSitemapUrlSet = (
  pages: { slug: string; updatedAt: string | Date | null }[]
): string => {
  const urlSet = pages
    .map(
      (page) =>
        `<url>
            <loc>${siteUrl}/posts/${page.slug}</loc>
            <lastmod>${page.updatedAt}</lastmod>
        </url>`
    )
    .join('');

  return `<urlset 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <url>
            <loc>${siteUrl}</loc>
        </url>
          ${urlSet}
        </urlset>`;
};

export const GET = async (): Promise<Response> => {
  const blogPostPaths = await getAllPost();
  const sitemap = createSitemapUrlSet(blogPostPaths);
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
};
