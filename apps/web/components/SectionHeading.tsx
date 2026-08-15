export function SectionHeading({ eyebrow, title, body, inverse = false }: { eyebrow: string; title: string; body?: string; inverse?: boolean }) {
  return <div className={`section-heading ${inverse ? 'inverse' : ''}`} data-reveal><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}
