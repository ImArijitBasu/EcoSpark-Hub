import { MetadataRoute } from 'next';

export const revalidate = 3600; // Regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Static core routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/ideas`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    // Dynamic fetching of all recent ideas to inject into the Google sitemap
    const res = await fetch(`${apiUrl}/ideas?limit=100`, { next: { revalidate: 3600 } });
    const data = await res.json();
    
    if (data.data && Array.isArray(data.data)) {
      const dynamicRoutes = data.data.map((idea: any) => ({
        url: `${baseUrl}/ideas/${idea.id}`,
        lastModified: new Date(idea.updatedAt || idea.createdAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
      routes.push(...dynamicRoutes);
    }
  } catch (error) {
    // If backend fetch fails (e.g. during build time without a backend), just return static routes
    console.error('Failed to generate dynamic sitemap routes', error);
  }

  return routes;
}

