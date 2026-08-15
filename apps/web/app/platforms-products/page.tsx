import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { PlatformsLandingV2 } from '@/components/pages/PlatformsLandingV2';

export const metadata: Metadata = {
  title: 'Platforms & Products | BRAINTEK',
  description:
    'Explore BRAINTEK platforms for assessment, leadership readiness, academic operations, workflow automation, student services and digital protection.',
};

export default async function PlatformsProductsPage() {
  const products = await cms.products();

  return (
    <main id="main-content">
      <PlatformsLandingV2 products={products} />
    </main>
  );
}
