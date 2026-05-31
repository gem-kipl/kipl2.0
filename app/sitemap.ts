import type { MetadataRoute } from 'next';
import { getProductSlugs } from '@/lib/wordpress';
import { APPLICATIONS, ROUTES } from '@/lib/constants';

export const revalidate = 3600;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}${ROUTES.home}`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}${ROUTES.products}`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}${ROUTES.applications}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}${ROUTES.quality}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}${ROUTES.exports}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}${ROUTES.manufacturing}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}${ROUTES.about}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}${ROUTES.contact}`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const applicationRoutes: MetadataRoute.Sitemap = APPLICATIONS.map((a) => ({
    url: `${SITE_URL}${ROUTES.applications}/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getProductSlugs();
    productRoutes = slugs.map((slug) => ({
      url: `${SITE_URL}${ROUTES.products}/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...applicationRoutes, ...productRoutes];
}
