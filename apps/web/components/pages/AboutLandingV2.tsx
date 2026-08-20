import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { CeoPortrait } from './CeoPortrait';
import { HomeFinalCTA } from '@/components/HomeFinalCTA';
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
          src="/pages/heroes/about.jpg"
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

      <section className={styles.who}>
        <div className={`container ${styles.whoGrid}`}>
          <div className={styles.whoLead}>
            <p className={styles.sectionKicker}>Who we are</p>
            <div className={styles.whoHeadline}>
              <h2>One institutional model for protection, performance and human capability.</h2>
            </div>
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


      <section id="why-braintek" className={styles.why}>
        <div className={`container ${styles.whyGrid}`}>
          <div className={styles.whyLead}>
            <p className={styles.sectionKicker}>Why BRAINTEK</p>
            <h2>Connected by design. Practical in delivery.</h2>
            <p>
              BRAINTEK brings security, systems and human capability together
              so institutions do not have to manage protection, technology and
              development as separate initiatives.
            </p>
          </div>

          <div className={styles.whyReasons}>
            <article>
              <span>01</span>
              <div>
                <h3>Connected</h3>
                <p>
                  One operating model across digital protection, intelligent
                  systems and workforce capability.
                </p>
              </div>
            </article>

            <article>
              <span>02</span>
              <div>
                <h3>Practical</h3>
                <p>
                  Solutions are shaped around real workflows, roles,
                  constraints and measurable institutional outcomes.
                </p>
              </div>
            </article>

            <article>
              <span>03</span>
              <div>
                <h3>Sustainable</h3>
                <p>
                  Delivery is designed for adoption, operational relevance and
                  long-term value rather than isolated interventions.
                </p>
              </div>
            </article>

            <p className={styles.whyStatement}>
              <strong>The advantage is the connection.</strong>
              One coordinated model instead of separate protection, systems and
              training initiatives.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.pillars}>
        <div className={`container ${styles.pillarHeader}`}>
          <p className={styles.sectionKicker}>Our business architecture</p>

          <div className={styles.pillarHeadingMain}>
            <h2>Protect. Build. Empower.</h2>
            <p>
              Three connected capabilities designed to operate as one
              institutional transformation model.
            </p>
          </div>
        </div>

        <div className={`container ${styles.pillarGrid}`}>
          <Link href="/services" className={styles.pillarCard}>
            <div className={styles.pillarCardHead}>
              <strong>Protect</strong>
              <span>01</span>
            </div>
            <div className={styles.pillarMedia}>
              <img src="/home/pillars/pillar-protect.jpg" alt="" />
              <i aria-hidden="true" />
            </div>
            <div className={styles.pillarBody}>
              <h3>Cybersecurity &amp; Digital Protection</h3>
              <p>
                Secure digital environments through stronger protection,
                monitoring, compliance readiness and resilience.
              </p>
              <span>Explore capability <ArrowUpRight size={15} /></span>
            </div>
          </Link>

          <Link href="/services" className={styles.pillarCard}>
            <div className={styles.pillarCardHead}>
              <strong>Build</strong>
              <span>02</span>
            </div>
            <div className={styles.pillarMedia}>
              <img src="/home/pillars/pillar-build.jpg" alt="" />
              <i aria-hidden="true" />
            </div>
            <div className={styles.pillarBody}>
              <h3>Software Solutions &amp; Systems Development</h3>
              <p>
                Create customized systems, workflow automation, AI-enabled
                applications and connected institutional platforms.
              </p>
              <span>Explore capability <ArrowUpRight size={15} /></span>
            </div>
          </Link>

          <Link href="/services" className={styles.pillarCard}>
            <div className={styles.pillarCardHead}>
              <strong>Empower</strong>
              <span>03</span>
            </div>
            <div className={styles.pillarMedia}>
              <img src="/home/pillars/pillar-empower.jpg" alt="" />
              <i aria-hidden="true" />
            </div>
            <div className={styles.pillarBody}>
              <h3>Manpower Development &amp; Workforce Empowerment</h3>
              <p>
                Advance leadership readiness, psychometric-informed
                development, AI fluency and role-relevant capability.
              </p>
              <span>Explore capability <ArrowUpRight size={15} /></span>
            </div>
          </Link>
        </div>
      </section>

      <section className={styles.direction}>
        <div className={`container ${styles.directionInner}`}>
          <div className={styles.directionHeader}>
            <div>
              <p className={styles.sectionKicker}>Our direction</p>
              <h2>Clear direction. Connected progress.</h2>
            </div>

            <p className={styles.directionIntro}>
              BRAINTEK connects secure foundations, intelligent systems and
              human capability through one institutional direction.
            </p>
          </div>

          <div className={styles.directionStatements}>
            <article>
              <div className={styles.directionMeta}>
                <span>01</span>
                <p>Vision</p>
              </div>
              <h3>
                A trusted leader in secure, intelligent and human-centered
                institutional transformation.
              </h3>
            </article>

            <article>
              <div className={styles.directionMeta}>
                <span>02</span>
                <p>Mission</p>
              </div>
              <h3>
                Protect what matters. Modernize how institutions operate.
                Strengthen the people who drive performance.
              </h3>
            </article>

            <article>
              <div className={styles.directionMeta}>
                <span>03</span>
                <p>Perspective</p>
              </div>
              <h3>
                Institutional progress is strongest when secure foundations,
                intelligent systems and empowered people move together.
              </h3>
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
        <div className={`container ${styles.valuesLayout}`}>
          <aside className={styles.valuesSide}>
            <p className={styles.sectionKicker}>Values</p>
            <h2>Principles that guide our work.</h2>
            <p>
              Security, intelligence, responsibility and human capability shape
              how BRAINTEK approaches institutional challenges, delivery and
              long-term value.
            </p>
          </aside>

          <div className={styles.valuesGrid}>
            {values.map(([number, title, text]) => (
              <article className={styles.valueCard} key={title}>
                <div className={styles.valueTop}>
                  <span>{number}</span>
                  <i aria-hidden="true" />
                </div>

                <div className={styles.valueBody}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>

                <b aria-hidden="true">{number}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeFinalCTA />
    </div>
  );
}
