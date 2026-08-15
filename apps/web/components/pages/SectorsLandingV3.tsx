import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Layers3,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from 'lucide-react';
import { HomeSectors } from '@/components/HomeSectors';
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
    <div className={styles.page}>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/services/services-hero.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Sectors / Institutional Pathways</p>

            <h1>
              Different environments.
              <br />
              One integrated approach.
            </h1>

            <p className={styles.heroBody}>
              BRAINTEK adapts protection, systems, automation, AI and human
              capability to the mandates, service models and operating realities
              of each sector—not to one generic transformation formula.
            </p>

            <div className={styles.heroActions}>
              <Link href="#sector-pathways" className={styles.primaryButton}>
                Explore sector pathways
                <ChevronRight size={16} />
              </Link>

              <Link href="/contact" className={styles.secondaryButton}>
                Discuss your environment
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <aside className={styles.heroModel}>
            <p>Sector-sensitive delivery</p>

            <article>
              <span>01</span>
              <div>
                <strong>Understand</strong>
                <small>Mandate & operating reality</small>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <strong>Adapt</strong>
                <small>Systems, security & capability</small>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <strong>Deliver</strong>
                <small>Practical institutional outcomes</small>
              </div>
            </article>
          </aside>
        </div>
      </section>

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
        <div className={`container ${styles.contextGrid}`}>
          <p className={styles.sectionKicker}>Why sector context matters</p>

          <div className={styles.contextHeadline}>
            <h2>
              Transformation should fit the environment—not force the environment
              to fit the solution.
            </h2>
          </div>

          <div className={styles.contextCopy}>
            <p>
              Different organizations operate under different mandates,
              pressures and service expectations. Public institutions may require
              stronger governance and continuity. Academic institutions may need
              coordinated scheduling, student services and faculty enablement.
              Enterprises may prioritize productivity, resilience and workflow
              speed.
            </p>

            <p>
              BRAINTEK connects secure digital foundations, practical systems
              and human capability so each engagement reflects the sector&apos;s
              real operating logic.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.model}>
        <div className={`container ${styles.modelHeader}`}>
          <p className={styles.darkKicker}>One connected model</p>

          <div>
            <h2>
              Protect. Build. Empower.
              <br />
              Adapted to each sector.
            </h2>
            <p>
              The same three commercial pillars travel across every environment,
              but their emphasis changes according to risk, workflow, service
              demand and workforce reality.
            </p>
          </div>
        </div>

        <div className={styles.modelGrid}>
          <article>
            <div className={styles.modelTop}>
              <span>01</span>
              <ShieldCheck size={21} strokeWidth={1.35} />
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
              <Workflow size={21} strokeWidth={1.35} />
            </div>

            <p>Build</p>
            <h3>Create systems and workflows around how the institution actually operates.</h3>

            <div className={styles.modelList}>
              <span><Check size={12} /> Custom systems & platforms</span>
              <span><Check size={12} /> Workflow automation</span>
              <span><Check size={12} /> Applied AI integration</span>
            </div>
          </article>

          <article>
            <div className={styles.modelTop}>
              <span>03</span>
              <UsersRound size={21} strokeWidth={1.35} />
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
      </section>

      <section className={styles.strengths}>
        <div className={`container ${styles.strengthHeader}`}>
          <div>
            <p className={styles.sectionKicker}>Cross-sector strengths</p>
            <h2>
              What stays consistent,
              <br />
              even when the sector changes.
            </h2>
          </div>

          <p>
            BRAINTEK&apos;s sector approach changes the emphasis, not the standard.
            These principles travel across government, education, enterprise,
            people-development and service-driven environments.
          </p>
        </div>

        <div className={`container ${styles.strengthGrid}`}>
          {strengths.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <Sparkles size={17} strokeWidth={1.3} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.engagement}>
        <div className={`container ${styles.engagementHeader}`}>
          <p className={styles.darkKicker}>Engagement model</p>

          <div>
            <h2>A disciplined path from context to measurable improvement.</h2>
            <p>
              Sector relevance begins before implementation. BRAINTEK starts with
              the environment, shapes the right intervention, supports adoption
              and evaluates what should improve next.
            </p>
          </div>
        </div>

        <div className={`container ${styles.processGrid}`}>
          {process.map(([number, title, text], index) => (
            <article key={number}>
              <div className={styles.processTop}>
                <span>{number}</span>
                {index === 0 ? (
                  <Layers3 size={17} />
                ) : (
                  <ArrowRight size={16} />
                )}
              </div>

              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGrid} aria-hidden="true" />

        <div className={`container ${styles.finalInner}`}>
          <div>
            <p>Sector discussion</p>
            <h2>
              Start with the operating reality.
              <br />
              Then shape the right solution.
            </h2>
          </div>

          <div className={styles.finalAside}>
            <p>
              Tell us where your institution operates, what needs to improve and
              what constraints matter. BRAINTEK can help frame the appropriate
              combination of protection, systems and capability.
            </p>

            <Link href="/contact">
              Request a Strategic Consultation
              <span>
                <ChevronRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
