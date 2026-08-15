import { processSteps } from '@/lib/content';
export function Process() {
  return <div className="process" data-reveal>{processSteps.map((step, i) => <div className="process-step" key={step}><span>{String(i+1).padStart(2,'0')}</span><strong>{step}</strong>{i < processSteps.length - 1 && <i aria-hidden="true" />}</div>)}</div>;
}
