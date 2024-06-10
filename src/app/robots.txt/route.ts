const siteUrl = process.env.SITE_URL!;

export const GET = async (): Promise<Response> => {
  const robots = `User-agent: *
Disallow: /dashboard/
Sitemap: ${siteUrl}/sitemap.xml
  `;
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
