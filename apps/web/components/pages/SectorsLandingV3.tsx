import {
  ArrowRight,
  Check,
  Layers3,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from 'lucide-react';
import { HomeSectors } from '@/components/HomeSectors';
import { InstitutionalHero } from '@/components/continuation/InstitutionalHero';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
import styles from './SectorsLandingV3.module.css';

type Sector = {
  slug: string;
  name: string;
  summary?: string | null;
};

type SectorsLandingV3Props = {
  sectors: Sector[];
};

const strengths = [
  {
    number: '01',
    title: 'Security',
    text: 'Protection, resilience and digital trust remain foundational across every institutional environment.',
  },
  {
    number: '02',
    title: 'Systems Thinking',
    text: 'Technology is shaped around real processes, dependencies, users and institutional constraints.',
  },
  {
    number: '03',
    title: 'Automation',
    text: 'Workflow design reduces friction while improving coordination, consistency and operational visibility.',
  },
  {
    number: '04',
    title: 'Capability Development',
    text: 'People, leaders and teams are prepared to use systems effectively and sustain the intended change.',
  },
  {
    number: '05',
    title: 'Governance',
    text: 'Implementation is framed around accountability, control, responsible adoption and institutional realities.',
  },
  {
    number: '06',
    title: 'Sustainability',
    text: 'Solutions are designed for continuity and measurable improvement rather than short-lived intervention.',
  },
];

const process = [
  ['01', 'Diagnose', 'Understand the operating environment, priorities, risks and capability gaps.'],
  ['02', 'Secure', 'Strengthen the foundation so digital change starts from a more resilient position.'],
  ['03', 'Design', 'Translate the real institutional need into the right systems, workflows and capability model.'],
  ['04', 'Implement', 'Introduce the solution around actual users, processes, governance and operating conditions.'],
  ['05', 'Enable', 'Equip leaders and teams with the clarity, readiness and skills needed to sustain the change.'],
  ['06', 'Evaluate', 'Review outcomes, identify what should improve and create the next cycle of progress.'],
];

export function SectorsLandingV3({
  sectors,
}: SectorsLandingV3Props) {
  return (
    <div className={`home-v2 ${styles.page}`}>
      <InstitutionalHero
        variant="sectors"
        eyebrow="Sectors / Institutional Pathways"
        title="Different environments. One integrated approach."
        body="BRAINTEK adapts protection, systems, automation, AI and human capability to the mandates, service models and operating realities of each sector—not to one generic transformation formula."
        modelLabel="Sector-sensitive delivery"
        rows={[
          { number: '01', title: 'Understand', note: 'Operating reality' },
          { number: '02', title: 'Adapt', note: 'Systems & capability' },
          { number: '03', title: 'Deliver', note: 'Institutional outcomes' },
        ]}
        primary={{ label: 'Explore sector pathways', href: '#sector-pathways' }}
        secondary={{ label: 'Discuss your environment', href: '/contact' }}
      />

      <div className={styles.motionStrip} aria-hidden="true">
        <div>
          <span>Government</span><i />
          <span>Education</span><i />
          <span>Enterprise</span><i />
          <span>Human Capital</span><i />
          <span>Professional Development</span><i />
          <span>Service Operations</span><i />
          <span>Government</span><i />
          <span>Education</span><i />
          <span>Enterprise</span>
        </div>
      </div>

      <div id="sector-pathways" className={styles.carouselSection}>
        <HomeSectors sectors={sectors} />
      </div>

      <section className={styles.context}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>Why sector context matters</p>

          <div className={styles.sectionHeading}>
            <h2>
              Transformation should fit the environment—not force the environment
              to fit the solution.
            </h2>

            <div className={styles.headingCopy}>
              <p>
                Different organizations operate under different mandates,
                pressures and service expectations. Public institutions,
                academic environments, enterprises and service organizations
                require different emphasis.
              </p>

              <p>
                BRAINTEK connects secure digital foundations, practical systems
                and human capability so each engagement reflects the sector&apos;s
                real operating logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.model}>
        <div className={styles.pageFrame}>
          <div className={styles.darkHeading}>
            <p className={styles.kickerLight}>One connected model</p>

            <div>
              <h2>Protect. Build. Empower. Adapted to each sector.</h2>
              <p>
                The same three commercial pillars travel across every
                environment, but their emphasis changes according to risk,
                workflow, service demand and workforce reality.
              </p>
            </div>
          </div>

          <div className={styles.modelGrid}>
            <article>
              <div className={styles.modelTop}>
                <span>01</span>
                <ShieldCheck size={20} strokeWidth={1.35} />
              </div>

              <p>Protect</p>
              <h3>Secure digital environments and strengthen institutional trust.</h3>

              <div className={styles.modelList}>
                <span><Check size={12} /> Cybersecurity & digital protection</span>
                <span><Check size={12} /> Monitoring & compliance readiness</span>
                <span><Check size={12} /> Risk-aware implementation</span>
              </div>
            </article>

            <article>
              <div className={styles.modelTop}>
                <span>02</span>
                <Workflow size={20} strokeWidth={1.35} />
              </div>

              <p>Build</p>
              <h3>Create systems and workflows around how the institution operates.</h3>

              <div className={styles.modelList}>
                <span><Check size={12} /> Custom systems & platforms</span>
                <span><Check size={12} /> Workflow automation</span>
                <span><Check size={12} /> Applied AI integration</span>
              </div>
            </article>

            <article>
              <div className={styles.modelTop}>
                <span>03</span>
                <UsersRound size={20} strokeWidth={1.35} />
              </div>

              <p>Empower</p>
              <h3>Strengthen the people and leaders responsible for sustaining progress.</h3>

              <div className={styles.modelList}>
                <span><Check size={12} /> Capability diagnosis</span>
                <span><Check size={12} /> Leadership readiness</span>
                <span><Check size={12} /> Targeted workforce development</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.strengths}>
        <div className={styles.pageFrame}>
          <p className={styles.kicker}>Cross-sector strengths</p>

          <div className={styles.sectionHeading}>
            <h2>What stays consistent, even when the sector changes.</h2>

            <p>
              BRAINTEK&apos;s sector approach changes the emphasis, not the
              standard. These principles travel across government, education,
              enterprise, people-development and service-driven environments.
            </p>
          </div>

          <div className={styles.strengthGrid}>
            {strengths.map((item) => (
              <article key={item.number}>
                <div>
                  <span>{item.number}</span>
                  <Sparkles size={16} strokeWidth={1.3} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.engagement}>
        <div className={styles.pageFrame}>
          <div className={styles.darkHeading}>
            <p className={styles.kickerLight}>Engagement model</p>

            <div>
              <h2>A disciplined path from context to measurable improvement.</h2>
              <p>
                Sector relevance begins before implementation. BRAINTEK starts
                with the environment, shapes the right intervention, supports
                adoption and evaluates what should improve next.
              </p>
            </div>
          </div>

          <div className={styles.processGrid}>
            {process.map(([number, title, text], index) => (
              <article key={number}>
                <div className={styles.processTop}>
                  <span>{number}</span>
                  {index === 0 ? <Layers3 size={16} /> : <ArrowRight size={15} />}
                </div>

                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeFinalCTA />
    </div>
  );
}
