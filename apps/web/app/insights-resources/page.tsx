import type { Metadata } from 'next';
import { cms } from '@/lib/cms';
import { ContinuationHero } from '@/components/continuation/ContinuationHero';
import { InsightsExperience } from '@/components/continuation/InsightsExperience';
import { ContinuationCTA } from '@/components/continuation/ContinuationCTA';

export const metadata:Metadata={title:'Insights & Resources',description:'Explore BRAINTEK insights on AI integration, workflow automation, workforce capability, responsible AI and sustainable institutional performance.',alternates:{canonical:'/insights-resources'}};

export default async function InsightsPage(){
  const [page,resources]=await Promise.all([
    cms.page('insights',{page_type:'insights',hero_title:'Applied thinking for institutions navigating transformation.',hero_subtitle:'BRAINTEK perspectives connect AI, automation, workforce capability, governance and institutional performance to practical implementation questions.'}),
    cms.resources(),
  ]);
  return <main id="main-content">
    <ContinuationHero eyebrow="Insights & resources" title={page.hero_title} body={page.hero_subtitle||''} primary="Explore insights" primaryHref="#page-content" secondary="Request a consultation" secondaryHref="/contact" variant="insights" visualLabel="Knowledge system" visualItems={['AI','Automation','Capability','Governance']}/>
    <InsightsExperience resources={resources}/>
    <ContinuationCTA title="Turn insight into action with BRAINTEK." body="Use the ideas as a starting point, then connect them to the operating reality of your institution."/>
  </main>
}
