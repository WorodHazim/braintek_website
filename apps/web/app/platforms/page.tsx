import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { PlatformsUnifiedPage } from '@/components/pages/PlatformsUnifiedPage';

export const metadata: Metadata = {
  title: 'Platforms & Products',
  description:
    'Explore BRAINTEK platforms for assessment, institutional operations, workflow automation and digital protection.',
  alternates: { canonical: '/platforms' },
};

export default async function PlatformsPage() {
  const products = await cms.products();

  return <PlatformsUnifiedPage products={products} />;
}
