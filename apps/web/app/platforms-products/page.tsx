import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { PlatformsUnifiedPage } from '@/components/pages/PlatformsUnifiedPage';

export const metadata: Metadata = {
  title: 'Platforms & Products',
  description:
    'Explore BRAINTEK platforms for assessment, institutional operations, workflow automation and digital protection.',
  alternates: { canonical: '/platforms-products' },
};

export default async function PlatformsProductsPage() {
  const products = await cms.products();

  return <PlatformsUnifiedPage products={products} />;
}
