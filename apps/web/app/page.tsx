import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Workflow, UsersRound } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { cms } from '@/lib/cms';
import { TeamPortrait } from '@/components/TeamPortrait';
import { HomeAbout } from '@/components/HomeAbout';
import { HomeServices } from '@/components/HomeServices';
import { HomeSectors } from '@/components/HomeSectors';
import { HomeProducts } from '@/components/HomeProducts';
import { HomeWhy } from '@/components/HomeWhy';
import { HomePartners } from '@/components/HomePartners';
import { HomeProcess } from '@/components/HomeProcess';
import { HomeInsights } from '@/components/HomeInsights';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';

const pillarVisuals = [
  { icon: ShieldCheck, verb: 'Protect', className: 'protect' },
  { icon: Workflow, verb: 'Build', className: 'build' },
  { icon: UsersRound, verb: 'Empower', className: 'empower' },
] as const;


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
  const homeResources = resources;
  const homeTeam = team.slice(0, 4);
  const homePartners = partners.slice(0, 6);

  return (
    <main id="main-content" className="home-v2">
      <Hero
        eyebrow="BRAINTEK AI SOLUTIONS & CONSULTANCIES"
        title={page.hero_title}
        body={page.hero_subtitle || ''}
      />

      <section className="home-credibility" aria-label="BRAINTEK capabilities">
        <div className="home-credibility-track">
          {[0, 1].map((copy) => (
            <div className="home-credibility-set" key={copy} aria-hidden={copy === 1}>
              <span>Cybersecurity</span><i />
              <span>Software Systems</span><i />
              <span>Workflow Automation</span><i />
              <span>Responsible AI</span><i />
              <span>Workforce Capability</span><i />
              <span>Psychometric-Informed Development</span><i />
            </div>
          ))}
        </div>
      </section>

      <HomeAbout />

      <section className="home-pillars-section">
        <div className="container home-section-intro home-section-intro-dark" data-reveal>
          <p className="home-kicker light">Three business pillars</p>
          <div>
            <h2>Protect. Build. Empower.</h2>
            <p>Three commercial pillars, designed to work as one institutional transformation model.</p>
          </div>
        </div>

        <div className="home-pillar-stage">
          {pillarVisuals.map((visual, index) => {
            const source = [
              {
                title: 'Cybersecurity & Digital Protection',
                text: 'Protect digital environments through monitoring, testing, compliance readiness and resilient security foundations.',
                href: '/services',
              },
              {
                title: 'Software Solutions & Systems Development',
                text: 'Build custom systems, connected platforms, workflow automation and AI-enabled operational environments.',
                href: '/services',
              },
              {
                title: 'Manpower Development & Workforce Empowerment',
                text: 'Strengthen leaders and teams through diagnostics, AI readiness and structured capability development.',
                href: '/services',
              },
            ][index];
            const Icon = visual.icon;

            return (
              <Link href={source.href} className={`home-pillar-panel ${visual.className}`} key={visual.verb}>
                <div className="home-pillar-art" aria-hidden="true"><span /><span /><span /></div>
                <div className="home-pillar-top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={21} strokeWidth={1.35} />
                </div>
                <div className="home-pillar-copy">
                  <p>{visual.verb}</p>
                  <h3>{source.title}</h3>
                  <span>{source.text}</span>
                </div>
                <ArrowUpRight className="home-pillar-arrow" size={22} />
              </Link>
            );
          })}
        </div>
      </section>

      <HomeServices services={homeServices} />

      <HomeSectors sectors={homeSectors} />

      <HomeProducts products={homeProducts} />

      <HomeWhy />

      <section className="home-section home-team-section">
        <div className="container home-section-intro" data-reveal>
          <p className="home-kicker">Expert team</p>
          <div>
            <h2>Strategic, technical and human-capability depth behind the work.</h2>
            <Link className="home-arrow-link" href="/expert-team">Meet the expert team <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <div className="container home-team-rail">
          {homeTeam.map((member, index) => (
            <article className="home-team-card" key={member.name}>
              <div className="home-team-number">{String(index + 1).padStart(2, '0')}</div>
              <TeamPortrait name={member.name} initials={member.initials} portraitUrl={member.portraitUrl} />
              <div className="home-team-copy">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span>{member.contribution}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <HomePartners partners={homePartners} />

      <HomeProcess />

      <HomeInsights resources={homeResources} />

      <HomeFinalCTA />
    </main>
  );
}
