import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { cms } from '@/lib/cms';
import styles from './ServiceDetailPage.module.css';

type SeoRecord = {
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
};

type ServiceRecord = {
  slug: string;
  name: string;
  summary?: string | null;
  pillar?: string | null;

  service_frame?: string | null;
  serviceFrame?: string | null;

  hero_text?: string | null;
  heroText?: string | null;

  long_description?: unknown;
  longDescription?: unknown;

  outcome_text?: string | null;
  outcomeText?: string | null;

  key_outcomes?: unknown;
  keyOutcomes?: unknown;

  seo?: SeoRecord | null;
  seo_id?: SeoRecord | null;
};

type PillarKey = 'protect' | 'build' | 'empower';

type PageCopy = {
  verb: 'Protect' | 'Build' | 'Empower';
  pillarTitle: string;
  heroLine: string;
  deliverables: string[];
  outcomes: string[];
  approach: string[];
};

function textFromRichValue(value: unknown): string {
  if (!value) return '';

  if (typeof value === 'string') return value.trim();

  if (Array.isArray(value)) {
    return value
      .map((item) => textFromRichValue(item))
      .filter(Boolean)
      .join('\n\n');
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;

    if (typeof record.text === 'string') return record.text.trim();

    if (Array.isArray(record.children)) {
      return textFromRichValue(record.children);
    }

    if (Array.isArray(record.content)) {
      return textFromRichValue(record.content);
    }
  }

  return '';
}

function paragraphsFrom(value: unknown): string[] {
  return textFromRichValue(value)
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function listFrom(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') {
          const record = item as Record<string, unknown>;
          const candidate =
            record.title ??
            record.label ??
            record.text ??
            record.value ??
            record.name ??
            record.description;

          return typeof candidate === 'string' ? candidate.trim() : '';
        }
        return '';
      })
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/\n|•|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function classifyService(service: ServiceRecord): PillarKey {
  const source = [
    service.pillar,
    service.service_frame,
    service.serviceFrame,
    service.name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (
    source.includes('cyber') ||
    source.includes('protection') ||
    source.includes('penetration') ||
    source.includes('vulnerability') ||
    source.includes('security') ||
    source.includes('compliance')
  ) {
    return 'protect';
  }

  if (
    source.includes('manpower') ||
    source.includes('workforce') ||
    source.includes('psychometric') ||
    source.includes('training') ||
    source.includes('leadership') ||
    source.includes('teacher') ||
    source.includes('capability') ||
    source.includes('learning')
  ) {
    return 'empower';
  }

  return 'build';
}

function fallbackCopy(service: ServiceRecord): PageCopy {
  const source = service.name.toLowerCase();
  const pillar = classifyService(service);

  if (source.includes('monitoring') || source.includes('compliance')) {
    return {
      verb: 'Protect',
      pillarTitle: 'Cybersecurity & Digital Protection',
      heroLine:
        'Improve security visibility, control maturity and compliance readiness through disciplined monitoring and practical oversight.',
      deliverables: [
        'Current-state security and control review',
        'Monitoring and visibility improvement priorities',
        'Compliance-readiness gap identification',
        'Practical remediation and governance recommendations',
      ],
      outcomes: [
        'Clearer visibility into digital risk',
        'Stronger control and compliance readiness',
        'More disciplined security oversight',
      ],
      approach: ['Assess exposure', 'Prioritize gaps', 'Strengthen controls', 'Review readiness'],
    };
  }

  if (source.includes('penetration') || source.includes('vulnerability')) {
    return {
      verb: 'Protect',
      pillarTitle: 'Cybersecurity & Digital Protection',
      heroLine:
        'Identify exploitable weaknesses before they become operational risks through focused testing and actionable remediation guidance.',
      deliverables: [
        'Scope and attack-surface definition',
        'Penetration and vulnerability testing',
        'Risk-ranked technical findings',
        'Remediation guidance and retest support',
      ],
      outcomes: [
        'Better understanding of exploitable exposure',
        'Prioritized remediation based on actual risk',
        'Improved resilience of critical digital assets',
      ],
      approach: ['Define scope', 'Test safely', 'Rank findings', 'Validate remediation'],
    };
  }

  if (source.includes('customized') || source.includes('platform development') || source.includes('system')) {
    return {
      verb: 'Build',
      pillarTitle: 'Software Solutions & Systems Development',
      heroLine:
        'Design and build digital systems around real institutional workflows instead of forcing operations into generic software structures.',
      deliverables: [
        'Requirements and workflow discovery',
        'Solution architecture and interface design',
        'Custom platform or application development',
        'Testing, deployment and implementation support',
      ],
      outcomes: [
        'Technology aligned to actual operating needs',
        'Reduced dependence on fragmented tools',
        'Stronger visibility and process consistency',
      ],
      approach: ['Discover', 'Architect', 'Build', 'Deploy'],
    };
  }

  if (source.includes('workflow') || source.includes('automation')) {
    return {
      verb: 'Build',
      pillarTitle: 'Software Solutions & Systems Development',
      heroLine:
        'Turn repetitive, fragmented processes into clearer digital workflows with better routing, visibility and operational control.',
      deliverables: [
        'Process and bottleneck mapping',
        'Automation opportunity prioritization',
        'Workflow design and rules configuration',
        'Dashboards, routing and implementation support',
      ],
      outcomes: [
        'Less repetitive manual activity',
        'Faster and more consistent process flow',
        'Improved operational visibility and accountability',
      ],
      approach: ['Map', 'Simplify', 'Automate', 'Measure'],
    };
  }

  if (source.includes('intelligent assistant') || source.includes('ai integration')) {
    return {
      verb: 'Build',
      pillarTitle: 'Software Solutions & Systems Development',
      heroLine:
        'Embed AI into real work environments through practical assistants, task support and controlled workflow integration.',
      deliverables: [
        'AI-use-case and readiness assessment',
        'Workflow and data integration design',
        'Intelligent assistant or task-support implementation',
        'Governance, testing and user-enablement support',
      ],
      outcomes: [
        'More consistent access to operational intelligence',
        'Reduced friction in repetitive knowledge work',
        'Responsible AI adoption tied to real tasks',
      ],
      approach: ['Identify use cases', 'Design controls', 'Integrate', 'Enable adoption'],
    };
  }

  if (source.includes('consultancy') || source.includes('governance')) {
    return {
      verb: 'Build',
      pillarTitle: 'Software Solutions & Systems Development',
      heroLine:
        'Create a practical AI direction that connects governance, opportunity, implementation readiness and institutional priorities.',
      deliverables: [
        'AI opportunity and readiness review',
        'Governance and responsible-use framing',
        'Prioritized implementation roadmap',
        'Decision support for pilots and scale-up',
      ],
      outcomes: [
        'Clearer AI priorities and decision criteria',
        'Stronger governance around adoption',
        'Better alignment between AI ambition and operational readiness',
      ],
      approach: ['Assess', 'Prioritize', 'Govern', 'Roadmap'],
    };
  }

  if (source.includes('psychometric') || source.includes('diagnosis')) {
    return {
      verb: 'Empower',
      pillarTitle: 'Manpower Development & Workforce Empowerment',
      heroLine:
        'Use structured assessment insight to understand capability, role fit and development priorities before deciding how people should be developed.',
      deliverables: [
        'Psychometric-informed assessment design',
        'Capability and role-relevance analysis',
        'Development-priority interpretation',
        'Structured recommendations for targeted intervention',
      ],
      outcomes: [
        'More evidence-informed development decisions',
        'Clearer capability gaps and priorities',
        'Better alignment between people, roles and intervention',
      ],
      approach: ['Assess', 'Interpret', 'Prioritize', 'Develop'],
    };
  }

  if (source.includes('leadership')) {
    return {
      verb: 'Empower',
      pillarTitle: 'Manpower Development & Workforce Empowerment',
      heroLine:
        'Strengthen leadership readiness for AI-enabled environments through assessment, structured development and responsible adoption capability.',
      deliverables: [
        'Leadership and AI-readiness assessment',
        'Capability-gap analysis',
        'Role-relevant learning pathway design',
        'Leadership development and adoption support',
      ],
      outcomes: [
        'Clearer leadership readiness for AI-enabled change',
        'More targeted executive development',
        'Stronger responsible-adoption capability',
      ],
      approach: ['Diagnose readiness', 'Define gaps', 'Develop', 'Reassess'],
    };
  }

  if (source.includes('teacher') || source.includes('teaching')) {
    return {
      verb: 'Empower',
      pillarTitle: 'Manpower Development & Workforce Empowerment',
      heroLine:
        'Help educators use AI with greater confidence, relevance and responsibility while keeping learning quality and institutional context central.',
      deliverables: [
        'Educator AI-readiness review',
        'Practical classroom and academic use-case design',
        'Responsible-use guidance and learning support',
        'Faculty enablement and adoption pathways',
      ],
      outcomes: [
        'More confident and responsible educator AI use',
        'Practical application tied to teaching needs',
        'Stronger institutional consistency around adoption',
      ],
      approach: ['Assess', 'Contextualize', 'Enable', 'Review'],
    };
  }

  if (source.includes('training') || source.includes('programme') || source.includes('program')) {
    return {
      verb: 'Empower',
      pillarTitle: 'Manpower Development & Workforce Empowerment',
      heroLine:
        'Build structured development programmes around real capability gaps, role requirements and measurable institutional priorities.',
      deliverables: [
        'Learning-needs and capability-gap diagnosis',
        'Programme and pathway design',
        'Facilitated development interventions',
        'Evaluation and improvement recommendations',
      ],
      outcomes: [
        'Development tied to actual capability need',
        'More structured and relevant learning pathways',
        'Clearer evidence of training value and next steps',
      ],
      approach: ['Diagnose', 'Design', 'Deliver', 'Evaluate'],
    };
  }

  if (pillar === 'protect') {
    return {
      verb: 'Protect',
      pillarTitle: 'Cybersecurity & Digital Protection',
      heroLine: service.summary || 'Strengthen digital protection around real institutional risks and operating conditions.',
      deliverables: ['Current-state review', 'Risk prioritization', 'Control recommendations', 'Implementation support'],
      outcomes: ['Stronger digital resilience', 'Clearer risk visibility', 'More disciplined protection'],
      approach: ['Assess', 'Prioritize', 'Strengthen', 'Review'],
    };
  }

  if (pillar === 'empower') {
    return {
      verb: 'Empower',
      pillarTitle: 'Manpower Development & Workforce Empowerment',
      heroLine: service.summary || 'Strengthen capability through structured, evidence-informed development.',
      deliverables: ['Needs diagnosis', 'Development design', 'Targeted intervention', 'Evaluation'],
      outcomes: ['Clearer capability priorities', 'More relevant development', 'Stronger workforce readiness'],
      approach: ['Diagnose', 'Design', 'Enable', 'Evaluate'],
    };
  }

  return {
    verb: 'Build',
    pillarTitle: 'Software Solutions & Systems Development',
    heroLine: service.summary || 'Build practical digital capability around real institutional workflows.',
    deliverables: ['Requirements discovery', 'Solution design', 'Implementation', 'Testing and enablement'],
    outcomes: ['Better operational fit', 'More connected workflows', 'Stronger implementation clarity'],
    approach: ['Discover', 'Design', 'Implement', 'Improve'],
  };
}

async function getService(slug: string): Promise<{ service: ServiceRecord; services: ServiceRecord[] } | null> {
  const services = (await cms.services()) as ServiceRecord[];
  const service = services.find((item) => item.slug === slug);

  if (!service) return null;

  return { service, services };
}

function seoFor(service: ServiceRecord): SeoRecord | null {
  if (service.seo && typeof service.seo === 'object') return service.seo;
  if (service.seo_id && typeof service.seo_id === 'object') return service.seo_id;
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getService(slug);

  if (!data) {
    return {
      title: 'Service | BRAINTEK',
      robots: { index: false, follow: false },
    };
  }

  const { service } = data;
  const seo = seoFor(service);
  const description = seo?.meta_description || service.summary || `Explore ${service.name} from BRAINTEK.`;

  return {
    title: seo?.meta_title || `${service.name} | BRAINTEK`,
    description,
    alternates: {
      canonical: seo?.canonical_url || `/services/${service.slug}`,
    },
    openGraph: {
      title: seo?.og_title || service.name,
      description: seo?.og_description || description,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getService(slug);

  if (!data) notFound();

  const { service, services } = data;
  const fallback = fallbackCopy(service);
  const heroText = service.hero_text || service.heroText || fallback.heroLine;

  const cmsBody = service.long_description ?? service.longDescription;
  const bodyParagraphs = paragraphsFrom(cmsBody);
  const narrative =
    bodyParagraphs.length > 0
      ? bodyParagraphs
      : [
          service.summary || heroText,
          `BRAINTEK approaches ${service.name.toLowerCase()} as part of a connected institutional model. The work is framed around the operating context, implementation requirements and the people who need to use or sustain the outcome.`,
        ];

  const cmsOutcomes = listFrom(service.key_outcomes ?? service.keyOutcomes);
  const outcomes = cmsOutcomes.length ? cmsOutcomes.slice(0, 6) : fallback.outcomes;

  const outcomeText = service.outcome_text || service.outcomeText || null;

  const samePillar = services.filter(
    (item) => item.slug !== service.slug && classifyService(item) === classifyService(service),
  );
  const otherServices = services.filter(
    (item) => item.slug !== service.slug && !samePillar.some((same) => same.slug === item.slug),
  );
  const related = [...samePillar, ...otherServices].slice(0, 3);

  const consultationHref = `/contact?service=${encodeURIComponent(service.slug)}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary || heroText,
    provider: {
      '@type': 'Organization',
      name: 'BRAINTEK AI Solutions & Consultancies',
    },
    url: `/services/${service.slug}`,
  };

  return (
    <main id="main-content" className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />

      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroArc} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTop}>
            <Link href="/services" className={styles.backLink}>
              <ArrowLeft size={15} />
              Services
            </Link>

            <span className={styles.pillarTag}>{fallback.verb}</span>
          </div>

          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{fallback.pillarTitle}</p>
              <h1>{service.name}</h1>
            </div>

            <div className={styles.heroAside}>
              <p>{heroText}</p>
              <Link href={consultationHref} className={styles.heroCta}>
                Discuss this service
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.motionStrip} aria-hidden="true">
        <div>
          <span>{fallback.verb}</span><i />
          <span>{service.name}</span><i />
          <span>Institutional performance</span><i />
          <span>Practical implementation</span><i />
          <span>{fallback.verb}</span><i />
          <span>{service.name}</span><i />
          <span>Institutional performance</span><i />
          <span>Practical implementation</span>
        </div>
      </div>

      <section className={styles.overview}>
        <div className={`container ${styles.overviewGrid}`}>
          <div className={styles.sectionLabel}>
            <span>01</span>
            <p>Service overview</p>
          </div>

          <div className={styles.narrative}>
            <h2>Built around the operating reality, not a generic template.</h2>
            {narrative.map((paragraph, index) => (
              <p key={`${service.slug}-narrative-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.delivery}>
        <div className={`container ${styles.deliveryGrid}`}>
          <div className={styles.deliveryIntro}>
            <div className={styles.sectionLabelLight}>
              <span>02</span>
              <p>What we deliver</p>
            </div>
            <h2>A practical scope shaped around the institution.</h2>
            <p>
              The exact engagement is defined during discovery. These are the core delivery areas
              typically associated with this service.
            </p>
          </div>

          <div className={styles.deliveryList}>
            {fallback.deliverables.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item}</h3>
                <ArrowRight size={17} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.outcomes}>
        <div className={`container ${styles.outcomesInner}`}>
          <div className={styles.outcomesHeader}>
            <div className={styles.sectionLabel}>
              <span>03</span>
              <p>Key outcomes</p>
            </div>

            <div>
              <h2>What the engagement is designed to improve.</h2>
              {outcomeText ? <p>{outcomeText}</p> : null}
            </div>
          </div>

          <div className={styles.outcomeGrid}>
            {outcomes.map((item, index) => (
              <article key={`${item}-${index}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Check size={16} aria-hidden="true" />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={`container ${styles.approachInner}`}>
          <div className={styles.approachHeader}>
            <div className={styles.sectionLabelLight}>
              <span>04</span>
              <p>How we approach it</p>
            </div>
            <h2>Structured enough to be disciplined. Flexible enough to fit reality.</h2>
          </div>

          <div className={styles.approachSteps}>
            {fallback.approach.map((step, index) => (
              <article key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true" />
                <h3>{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className={styles.related}>
          <div className={`container ${styles.relatedInner}`}>
            <header>
              <div className={styles.sectionLabel}>
                <span>05</span>
                <p>Related services</p>
              </div>
              <h2>Continue exploring BRAINTEK capabilities.</h2>
            </header>

            <div className={styles.relatedGrid}>
              {related.map((item, index) => (
                <Link href={`/services/${item.slug}`} className={styles.relatedCard} key={item.slug}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item.pillar || fallback.pillarTitle}</p>
                  <h3>{item.name}</h3>
                  <small>{item.summary}</small>
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.finalCta}>
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={`container ${styles.finalInner}`}>
          <div>
            <p>Discuss this service</p>
            <h2>Turn the requirement into a practical next step.</h2>
          </div>

          <div className={styles.finalAside}>
            <p>
              Tell us what needs to improve, what constraints you are working with, and what outcome
              matters most.
            </p>
            <Link href={consultationHref}>
              Book a Consultation
              <span><ChevronRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
