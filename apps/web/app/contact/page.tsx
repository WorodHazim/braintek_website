import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { ContactExperience } from '@/components/continuation/ContactExperience';

export const metadata: Metadata = {
  title: 'Contact BRAINTEK | Book a Consultation in Abu Dhabi',
  description:
    'Contact BRAINTEK in Abu Dhabi to discuss cybersecurity, intelligent systems, AI integration, workflow automation, platforms and workforce capability.',
};

type SearchValue = string | string[] | undefined;

function first(value: SearchValue) {
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    sector?: SearchValue;
    service?: SearchValue;
    platform?: SearchValue;
    product?: SearchValue;
  }>;
}) {
  const params = await searchParams;

  const [page, sectors, services, products] = await Promise.all([
    cms.page('contact', {
      page_type: 'contact',
      hero_title: 'Bring the challenge. We’ll shape the path.',
      hero_subtitle:
        'Start a structured conversation about cybersecurity, intelligent systems, AI integration, workflow automation or workforce capability—grounded in the real institutional context.',
    }),
    cms.sectors(),
    cms.services(),
    cms.products(),
  ]);

  return (
    <ContactExperience
      heroTitle={page.hero_title}
      heroBody={page.hero_subtitle || ''}
      sectors={sectors}
      services={services}
      products={products}
      initialSector={first(params.sector)}
      initialService={first(params.service)}
      initialProduct={first(params.platform) || first(params.product)}
    />
  );
}
