import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { CeoPortrait } from './CeoPortrait';
import styles from './AboutLandingV2.module.css';

type AboutLandingV2Props = {
  heroTitle: string;
  heroBody: string;
};

const values = [
  ['01', 'Security', 'Protection and responsible safeguards are foundational to sustainable transformation.'],
  ['02', 'Strategic Intelligence', 'We design around real institutional problems and usable decision-making.'],
  ['03', 'Operational Effectiveness', 'We focus on stronger workflows, better systems and dependable results in practice.'],
  ['04', 'Human Capability', 'Institutional strength depends on the quality, readiness and development of people.'],
  ['05', 'Responsible Innovation', 'Advanced technology is used with discipline, accountability and operational realism.'],
  ['06', 'Partnership', 'We work as aligned partners, adapting to strategic and operational realities.'],
  ['07', 'Excellence', 'We pursue precision, quality and depth in thinking, design, execution and service delivery.'],
  ['08', 'Sustainability', 'We build for continuity and long-term value rather than short-lived interventions.'],
];

export function AboutLandingV2({
  heroTitle,
  heroBody,
}: AboutLandingV2Props) {
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
            <p className={styles.kicker}>About BRAINTEK</p>
            <h1>{heroTitle}</h1>
            <p>{heroBody}</p>

            <div className={styles.heroActions}>
              <Link href="/services">
                Explore our services
                <ChevronRight size={16} />
              </Link>
              <Link href="/expert-team">
                Meet the team
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <aside className={styles.heroModel}>
            <p>One integrated model</p>
            <article><span>01</span><strong>Protect</strong><small>Digital trust</small></article>
            <article><span>02</span><strong>Build</strong><small>Systems & AI</small></article>
            <article><span>03</span><strong>Empower</strong><small>Human capability</small></article>
          </aside>
        </div>
      </section>

      <div className={styles.motionStrip} aria-hidden="true">
        <div>
          <span>Security</span><i />
          <span>Systems</span><i />
          <span>AI</span><i />
          <span>Automation</span><i />
          <span>Human capability</span><i />
          <span>Institutional performance</span><i />
          <span>Security</span><i />
          <span>Systems</span><i />
          <span>Human capability</span>
        </div>
      </div>

      <section className={styles.who}>
        <div className={`container ${styles.whoGrid}`}>
          <p className={styles.sectionKicker}>Who we are</p>

          <div className={styles.whoHeadline}>
            <h2>One institutional model for protection, performance and people.</h2>
          </div>

          <div className={styles.whoCopy}>
            <p>
              BRAINTEK AI Solutions & Consultancies works at the intersection
              of secure digital infrastructure, intelligent systems,
              operational improvement and workforce capability.
            </p>
            <p>
              We help institutions move beyond fragmented tools and isolated
              interventions toward environments in which security, systems and
              human readiness reinforce one another.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.pillars}>
        <div className={`container ${styles.pillarHeader}`}>
          <p className={styles.kicker}>Our business architecture</p>
          <div>
            <h2>Protect. Build. Empower.</h2>
            <p>Three commercial pillars designed to operate as one transformation model.</p>
          </div>
        </div>

        <div className={styles.pillarGrid}>
          <article>
            <span>01</span>
            <p>Protect</p>
            <h3>Cybersecurity & Digital Protection</h3>
            <small>Secure digital environments through stronger protection, monitoring, compliance readiness and resilience.</small>
          </article>
          <article>
            <span>02</span>
            <p>Build</p>
            <h3>Software Solutions & Systems Development</h3>
            <small>Create customized systems, workflow automation, AI-enabled applications and connected institutional platforms.</small>
          </article>
          <article>
            <span>03</span>
            <p>Empower</p>
            <h3>Manpower Development & Workforce Empowerment</h3>
            <small>Advance leadership readiness, psychometric-informed development, AI fluency and role-relevant capability.</small>
          </article>
        </div>
      </section>

      <section className={styles.direction}>
        <div className={`container ${styles.directionGrid}`}>
          <div>
            <p className={styles.sectionKicker}>Vision</p>
            <h2>A trusted leader in secure, intelligent, human-centered institutional transformation.</h2>
          </div>

          <div className={styles.directionStatements}>
            <article>
              <p>Mission</p>
              <h3>Protect what matters. Modernize how institutions operate. Strengthen the people who drive performance.</h3>
            </article>
            <article>
              <p>Perspective</p>
              <h3>Institutional progress is strongest when secure foundations, intelligent systems and empowered people move together.</h3>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.ceo}>
        <div className={`container ${styles.ceoGrid}`}>
          <div className={styles.ceoMedia}>
            <CeoPortrait />
            <span>Founder / CEO</span>
          </div>

          <div className={styles.ceoCopy}>
            <p className={styles.sectionKicker}>Leadership</p>
            <h2>Built around a connected view of institutional progress.</h2>

            <div className={styles.ceoName}>
              <h3>Prof. Fawzi Alghazali</h3>
              <p>CEO and Founder</p>
            </div>

            <p className={styles.ceoStatement}>
              BRAINTEK&apos;s leadership direction connects human-capital
              enablement, psychometric-informed development and AI-enabled
              institutional capability with a broader model of secure systems,
              practical implementation and measurable performance.
            </p>

            <p className={styles.ceoStatement}>
              The focus is not technology or training in isolation. It is the
              disciplined integration of security, systems and people around
              real institutional priorities.
            </p>

            <Link href="/expert-team">
              Meet the expert team
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className={`container ${styles.valuesInner}`}>
          <div className={styles.valuesHeader}>
            <p className={styles.sectionKicker}>Values</p>
            <h2>Principles that shape how BRAINTEK thinks, builds and delivers.</h2>
          </div>

          <div className={styles.valuesGrid}>
            {values.map(([number, title, text]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaGrid} aria-hidden="true" />
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p>Next step</p>
            <h2>Protect the environment. Modernize the operation. Strengthen the people who sustain it.</h2>
          </div>
          <div>
            <p>Talk to BRAINTEK about an integrated institutional transformation pathway.</p>
            <Link href="/contact">
              Request a Strategic Consultation
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
