import { Hero } from '@/components/Hero';
import { cms } from '@/lib/cms';
import { HomeAbout } from '@/components/HomeAbout';
import { HomePillars } from '@/components/HomePillars';
import { HomeServices } from '@/components/HomeServices';
import { HomeSectors } from '@/components/HomeSectors';
import { HomeProducts } from '@/components/HomeProducts';
import { HomeWhy } from '@/components/HomeWhy';
import { HomeTeam } from '@/components/HomeTeam';
import { HomePartners } from '@/components/HomePartners';
import { HomeProcess } from '@/components/HomeProcess';
import { HomeInsights } from '@/components/HomeInsights';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';


export default async function HomePage() {
  const [page, services, sectors, products, resources, team, partners] = await Promise.all([
    cms.page('home', {
      page_type: 'home',
      hero_title: 'Applied AI, Cybersecurity, and Strategic Capability Development for Institutions Ready to Move Forward',
      hero_subtitle: 'BRAINTEK helps government entities, educational institutions, enterprises, and service-driven organizations strengthen digital protection, automate workflows, build practical AI solutions, and advance workforce capability through psychometric-informed development and responsible implementation.',
    }),
    cms.services(),
    cms.sectors(),
    cms.products(),
    cms.resources(),
    cms.team(),
    cms.partners(),
  ]);

  const homeServices = services.slice(0, 6);
  const homeSectors = sectors.slice(0, 6);
  const homeProducts = products.slice(0, 6);
  const homeResources = resources.slice(0, 6);
  const homeTeam = team.slice(0, 6);
  const homePartners = partners.slice(0, 6);

  return (
    <main id="main-content" className="home-v2">
      <Hero
        eyebrow="BRAINTEK AI SOLUTIONS & CONSULTANCIES"
        title={page.hero_title}
        body={page.hero_subtitle || ''}
      />

      <HomeAbout />

      <HomePillars />

      <HomeServices services={homeServices} />
      <HomeSectors sectors={homeSectors} />
      <HomeProducts products={homeProducts} />
      <HomeWhy />

      <HomeTeam members={homeTeam} />

      <HomePartners partners={homePartners} />
      <HomeProcess />
      <HomeInsights resources={homeResources} />
      <HomeFinalCTA />
    </main>
  );
}
