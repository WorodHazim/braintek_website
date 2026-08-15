'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  QrCode,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import {
  FormEvent,
  useMemo,
  useState,
} from 'react';
import { ContinuationHero } from './ContinuationHero';
import styles from './ContactExperience.module.css';

type TaxonomyItem = {
  slug: string;
  name: string;
  summary?: string | null;
};

type ContactExperienceProps = {
  heroTitle: string;
  heroBody: string;
  sectors: TaxonomyItem[];
  services: TaxonomyItem[];
  products: TaxonomyItem[];
  initialSector?: string;
  initialService?: string;
  initialProduct?: string;
};

type FormState = {
  full_name: string;
  organization: string;
  role_title: string;
  email: string;
  phone: string;
  sector_interest: string;
  service_interest: string;
  product_interest: string;
  preferred_followup: 'email' | 'phone' | 'meeting';
  message: string;
  website: string;
};

const initialForm = (
  sector = '',
  service = '',
  product = '',
): FormState => ({
  full_name: '',
  organization: '',
  role_title: '',
  email: '',
  phone: '',
  sector_interest: sector,
  service_interest: service,
  product_interest: product,
  preferred_followup: 'email',
  message: '',
  website: '',
});

const locationLabel =
  'Beside Khalidiya Mall, Building 22, M Floor, Abu Dhabi, UAE';

const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(locationLabel);

const mapsEmbed =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(locationLabel) +
  '&output=embed';

function clean(value: string, max: number) {
  return value
    .normalize('NFKC')
    .replace(/\u0000/g, '')
    .trim()
    .slice(0, max);
}

export function ContactExperience({
  heroTitle,
  heroBody,
  sectors,
  services,
  products,
  initialSector = '',
  initialService = '',
  initialProduct = '',
}: ContactExperienceProps) {
  const [form, setForm] = useState<FormState>(() =>
    initialForm(initialSector, initialService, initialProduct),
  );
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const selectedContext = useMemo(() => {
    const sector = sectors.find(
      (item) => item.slug === form.sector_interest,
    )?.name;
    const service = services.find(
      (item) => item.slug === form.service_interest,
    )?.name;
    const product = products.find(
      (item) => item.slug === form.product_interest,
    )?.name;

    return [sector, service, product].filter(Boolean);
  }, [
    form.sector_interest,
    form.service_interest,
    form.product_interest,
    sectors,
    services,
    products,
  ]);

  const setField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.website) return;

    setStatus('sending');
    setErrorMessage('');

    const payload = {
      form_type: 'consultation',
      full_name: clean(form.full_name, 120),
      organization: clean(form.organization, 160),
      role_title: clean(form.role_title, 120),
      email: clean(form.email, 180).toLowerCase(),
      phone: clean(form.phone, 40),
      sector_interest: clean(form.sector_interest, 140),
      service_interest: clean(form.service_interest, 180),
      product_interest: clean(form.product_interest, 140),
      preferred_followup: form.preferred_followup,
      message: clean(form.message, 2000),
    };

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message =
          'We could not submit the inquiry. Please review the details or email info@braintek.ae.';

        try {
          const result = await response.json();
          if (typeof result?.error === 'string') {
            message = result.error;
          } else if (typeof result?.message === 'string') {
            message = result.message;
          }
        } catch {
          // Keep the safe fallback message.
        }

        throw new Error(message);
      }

      setStatus('success');
      setForm(initialForm());
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We could not submit the inquiry. Please email info@braintek.ae.',
      );
    }
  }

  return (
    <main className={styles.page}>
      <ContinuationHero
        eyebrow="Contact / Book a Consultation"
        title={heroTitle}
        body={heroBody}
        primaryLabel="Start the inquiry"
        primaryHref="#consultation"
        secondaryLabel="Email BRAINTEK"
        secondaryHref="mailto:info@braintek.ae"
      />

      <section
        id="consultation"
        className={styles.consultation}
        aria-labelledby="consultation-title"
      >
        <div className={`container ${styles.consultationIntro}`}>
          <div>
            <p className={styles.kicker}>Structured consultation</p>
            <h2 id="consultation-title">
              One form. The right conversation.
            </h2>
          </div>

          <p>
            Share enough context for BRAINTEK to understand the
            institutional need and route the conversation toward the
            most relevant service, sector or platform pathway.
          </p>
        </div>

        <div className={`container ${styles.formShell}`}>
          <aside className={styles.formGuide}>
            <div className={styles.guideTop}>
              <span>ABU DHABI / UAE</span>
              <h3>Start with the real challenge.</h3>
              <p>
                The form is intentionally structured around context,
                not a generic message box.
              </p>
            </div>

            <div className={styles.guideSteps}>
              <article>
                <span>01</span>
                <div>
                  <strong>Identify</strong>
                  <p>Who should we speak with?</p>
                </div>
              </article>

              <article>
                <span>02</span>
                <div>
                  <strong>Context</strong>
                  <p>Where does the need sit?</p>
                </div>
              </article>

              <article>
                <span>03</span>
                <div>
                  <strong>Priority</strong>
                  <p>What outcome are you trying to create?</p>
                </div>
              </article>
            </div>

            {selectedContext.length ? (
              <div className={styles.contextPreview}>
                <p>Current routing context</p>
                {selectedContext.map((item) => (
                  <span key={item}>
                    <Check size={12} />
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={styles.guideContact}>
              <a href="mailto:info@braintek.ae">
                <Mail size={16} />
                <span>
                  <small>Email</small>
                  info@braintek.ae
                </span>
              </a>

              <a href="tel:+97122341190">
                <Phone size={16} />
                <span>
                  <small>Phone</small>
                  02 234 1190
                </span>
              </a>
            </div>
          </aside>

          <div className={styles.formCard}>
            {status === 'success' ? (
              <div className={styles.success}>
                <span>
                  <CheckCircle2 size={28} />
                </span>
                <p>Inquiry received</p>
                <h3>Thank you. Your consultation request has been submitted.</h3>
                <p>
                  The information you shared can now be reviewed and
                  routed to the appropriate BRAINTEK conversation.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                >
                  Send another inquiry
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className={styles.formHeading}>
                  <div>
                    <p>Consultation brief</p>
                    <h3>Discuss your needs with BRAINTEK.</h3>
                  </div>
                  <span>01—03</span>
                </div>

                <input
                  className={styles.honeypot}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) =>
                    setField('website', event.target.value)
                  }
                  aria-hidden="true"
                />

                <fieldset>
                  <legend>
                    <span>01</span>
                    Who we are speaking with
                  </legend>

                  <div className={styles.twoCol}>
                    <label>
                      <span>Full name *</span>
                      <input
                        required
                        name="full_name"
                        autoComplete="name"
                        maxLength={120}
                        value={form.full_name}
                        onChange={(event) =>
                          setField('full_name', event.target.value)
                        }
                        placeholder="Your name"
                      />
                    </label>

                    <label>
                      <span>Organization *</span>
                      <input
                        required
                        name="organization"
                        autoComplete="organization"
                        maxLength={160}
                        value={form.organization}
                        onChange={(event) =>
                          setField('organization', event.target.value)
                        }
                        placeholder="Institution / company"
                      />
                    </label>

                    <label>
                      <span>Role / position</span>
                      <input
                        name="role_title"
                        autoComplete="organization-title"
                        maxLength={120}
                        value={form.role_title}
                        onChange={(event) =>
                          setField('role_title', event.target.value)
                        }
                        placeholder="Your role"
                      />
                    </label>

                    <label>
                      <span>Business email *</span>
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        maxLength={180}
                        value={form.email}
                        onChange={(event) =>
                          setField('email', event.target.value)
                        }
                        placeholder="name@organization.ae"
                      />
                    </label>

                    <label className={styles.full}>
                      <span>Phone / mobile</span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        maxLength={40}
                        value={form.phone}
                        onChange={(event) =>
                          setField('phone', event.target.value)
                        }
                        placeholder="+971"
                      />
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>
                    <span>02</span>
                    Where the need sits
                  </legend>

                  <div className={styles.twoCol}>
                    <label>
                      <span>Sector</span>
                      <select
                        value={form.sector_interest}
                        onChange={(event) =>
                          setField(
                            'sector_interest',
                            event.target.value,
                          )
                        }
                      >
                        <option value="">Select a sector</option>
                        {sectors.map((item) => (
                          <option
                            key={item.slug}
                            value={item.slug}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span>Service interest</span>
                      <select
                        value={form.service_interest}
                        onChange={(event) =>
                          setField(
                            'service_interest',
                            event.target.value,
                          )
                        }
                      >
                        <option value="">Select a service</option>
                        {services.map((item) => (
                          <option
                            key={item.slug}
                            value={item.slug}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.full}>
                      <span>Platform / product interest</span>
                      <select
                        value={form.product_interest}
                        onChange={(event) =>
                          setField(
                            'product_interest',
                            event.target.value,
                          )
                        }
                      >
                        <option value="">Select a platform</option>
                        {products.map((item) => (
                          <option
                            key={item.slug}
                            value={item.slug}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>
                    <span>03</span>
                    What should happen next
                  </legend>

                  <label className={styles.messageLabel}>
                    <span>Brief description of need *</span>
                    <textarea
                      required
                      name="message"
                      maxLength={2000}
                      value={form.message}
                      onChange={(event) =>
                        setField('message', event.target.value)
                      }
                      placeholder="Tell us about the context, challenge, goal or transformation priority."
                    />
                    <small>
                      {form.message.length.toLocaleString()} / 2,000
                    </small>
                  </label>

                  <div className={styles.followup}>
                    <p>Preferred follow-up</p>

                    <div>
                      {[
                        ['email', Mail, 'Email'],
                        ['phone', Phone, 'Phone'],
                        ['meeting', UsersRound, 'Meeting'],
                      ].map(([value, Icon, label]) => {
                        const typedValue =
                          value as FormState['preferred_followup'];

                        return (
                          <label
                            key={value as string}
                            className={
                              form.preferred_followup === value
                                ? styles.activeFollowup
                                : ''
                            }
                          >
                            <input
                              type="radio"
                              name="preferred_followup"
                              value={value as string}
                              checked={
                                form.preferred_followup === value
                              }
                              onChange={() =>
                                setField(
                                  'preferred_followup',
                                  typedValue,
                                )
                              }
                            />
                            <Icon size={15} />
                            <span>{label as string}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {status === 'error' ? (
                    <div className={styles.formError} role="alert">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div className={styles.submitRow}>
                    <p>
                      By submitting this form, you are asking BRAINTEK
                      to contact you about this inquiry. Final legal /
                      privacy language should be approved before
                      production go-live.
                    </p>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending'
                        ? 'Submitting…'
                        : 'Submit inquiry'}
                      <span>
                        <Send size={15} />
                      </span>
                    </button>
                  </div>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className={styles.channels}>
        <div className={`container ${styles.channelsIntro}`}>
          <p className={styles.kicker}>Direct contact</p>
          <h2>Choose the channel that fits the conversation.</h2>
        </div>

        <div className={`container ${styles.channelGrid}`}>
          <a href="tel:+97122341190" className={styles.channel}>
            <span>
              <Phone size={21} />
            </span>
            <p>Call BRAINTEK</p>
            <h3>02 234 1190</h3>
            <small>Direct business contact</small>
            <ArrowUpRight size={17} />
          </a>

          <a
            href="mailto:info@braintek.ae"
            className={styles.channel}
          >
            <span>
              <Mail size={21} />
            </span>
            <p>Email BRAINTEK</p>
            <h3>info@braintek.ae</h3>
            <small>Institutional inquiries & consultation</small>
            <ArrowUpRight size={17} />
          </a>

          <a
            href="#location"
            className={styles.channel}
          >
            <span>
              <MapPin size={21} />
            </span>
            <p>Visit BRAINTEK</p>
            <h3>Abu Dhabi, UAE</h3>
            <small>Beside Khalidiya Mall</small>
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section
        id="location"
        className={styles.location}
        aria-labelledby="location-title"
      >
        <div className={`container ${styles.locationHeader}`}>
          <div>
            <p className={styles.kicker}>Location & presence</p>
            <h2 id="location-title">
              Meet BRAINTEK in Abu Dhabi.
            </h2>
          </div>

          <p>
            Based in Abu Dhabi, BRAINTEK engages with institutions
            seeking intelligent systems, stronger workforce
            capability and sustainable operational improvement.
          </p>
        </div>

        <div className={`container ${styles.locationGrid}`}>
          <div className={styles.mapFrame}>
            <iframe
              title="BRAINTEK location near Khalidiya Mall, Abu Dhabi"
              src={mapsEmbed}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className={styles.mapBadge}>
              <MapPin size={15} />
              <span>
                BRAINTEK
                <small>Abu Dhabi / UAE</small>
              </span>
            </div>
          </div>

          <aside className={styles.locationCard}>
            <div className={styles.locationAddress}>
              <span>
                <Building2 size={18} />
              </span>
              <div>
                <p>Office</p>
                <h3>
                  Beside Khalidiya Mall,
                  <br />
                  Building 22, M Floor
                  <br />
                  Abu Dhabi, UAE
                </h3>
              </div>
            </div>

            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className={styles.directions}
            >
              Open directions
              <ArrowUpRight size={16} />
            </a>

            <div className={styles.qrBlock}>
              <div className={styles.qrImage}>
                <img
                  src="/contact/braintek-contact-qr.png"
                  alt="QR code to save BRAINTEK contact details"
                />
              </div>

              <div>
                <p>
                  <QrCode size={15} />
                  Scan to save contact
                </p>
                <h4>BRAINTEK on your phone.</h4>
                <span>
                  Phone, email, website and office address in one
                  contact card.
                </span>

                <a
                  href="/contact/braintek-contact.vcf"
                  download="BRAINTEK-contact.vcf"
                >
                  <Download size={14} />
                  Save contact file
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.expect}>
        <div className={`container ${styles.expectHeader}`}>
          <p className={styles.kicker}>What happens next</p>
          <h2>A clear path from inquiry to the right conversation.</h2>
        </div>

        <div className={`container ${styles.expectGrid}`}>
          <article>
            <span>01</span>
            <Route size={20} />
            <h3>Review</h3>
            <p>
              The context, intended outcome and relevant
              institutional environment are reviewed.
            </p>
          </article>

          <article>
            <span>02</span>
            <Sparkles size={20} />
            <h3>Route</h3>
            <p>
              The inquiry is connected to the most relevant service,
              sector, platform or expert discipline.
            </p>
          </article>

          <article>
            <span>03</span>
            <MessageSquareText size={20} />
            <h3>Discuss</h3>
            <p>
              A focused conversation is used to frame practical next
              steps around the real need.
            </p>
          </article>

          <article>
            <span>04</span>
            <ShieldCheck size={20} />
            <h3>Shape</h3>
            <p>
              Where appropriate, the conversation can move toward a
              structured scope and implementation pathway.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGrid} aria-hidden="true" />
        <div className={`container ${styles.finalInner}`}>
          <div>
            <p>Prefer a direct conversation?</p>
            <h2>Make the first contact simple.</h2>
          </div>

          <div className={styles.finalActions}>
            <a href="tel:+97122341190">
              <Phone size={16} />
              Call 02 234 1190
            </a>

            <a href="mailto:info@braintek.ae">
              <Mail size={16} />
              Email BRAINTEK
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
