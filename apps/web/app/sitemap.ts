import type { MetadataRoute } from 'next';
import { cms } from '@/lib/cms';
import { fetchCaseStudies } from '@/lib/marketing-cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://braintek.ae';

  const fixed = [
    '',
    '/about',
    '/services',
    '/sectors',
    '/platforms-products',
    '/portfolio',
    '/expert-team',
    '/partners',
    '/insights-resources',
    '/contact',
  ];

  const [services, sectors, products, resources, caseStudies] = await Promise.all([
    cms.services(),
    cms.sectors(),
    cms.products(),
    cms.resources(),
    fetchCaseStudies(),
  ]);

  const now = new Date();

  return [
    ...fixed.map((url) => ({
      url: `${base}${url}`,
      lastModified: now,
      changeFrequency:
        url === '' ? ('weekly' as const) : ('monthly' as const),
      priority: url === '' ? 1 : 0.8,
    })),

    ...services.map((x) => ({
      url: `${base}/services/${x.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    ...sectors.map((x) => ({
      url: `${base}/sectors/${x.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    ...products.map((x) => ({
      url: `${base}/platforms-products/${x.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    ...resources.map((x) => ({
      url: `${base}/insights-resources/${x.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    ...caseStudies.map((x) => ({
      url: `${base}/portfolio/${x.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
