import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { ContinuationHero } from '@/components/continuation/ContinuationHero';
import { PartnersExperience } from '@/components/continuation/PartnersExperience';
import { ContinuationCTA } from '@/components/continuation/ContinuationCTA';

export const metadata:Metadata={title:'Partners',description:'Selected BRAINTEK partners and institutional collaborators, presented with restrained, source-aligned collaboration language.',alternates:{canonical:'/partners'}};

export default async function PartnersPage(){
  const [page,partners]=await Promise.all([
    cms.page('partners',{page_type:'partners',hero_title:'Institutional relationships built around complementary capability.',hero_subtitle:'BRAINTEK operates within an ecosystem of institutional, academic, technology and research relationships, described with the same discipline applied across the rest of the platform.'}),
    cms.partners(),
  ]);
  return <main id="main-content">
    <ContinuationHero eyebrow="Partners & collaborators" title={page.hero_title} body={page.hero_subtitle||''} primary="Start a conversation" secondary="Explore relationships" secondaryHref="#page-content" variant="partners" visualLabel="Connected ecosystem" visualItems={['Institutions','Academia','Technology','Research']}/>
    <PartnersExperience partners={partners}/>
    <ContinuationCTA title="Explore a strategic collaboration with BRAINTEK." body="Start a structured discussion around institutional capability, technology, research or solution complementarity."/>
  </main>
}
