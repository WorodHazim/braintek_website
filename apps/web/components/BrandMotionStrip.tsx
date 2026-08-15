import styles from './BrandMotionStrip.module.css';

const signals = [
  'Protect',
  'Build',
  'Empower',
  'Cybersecurity',
  'Software Systems',
  'Responsible AI',
  'Workforce Capability',
  'Institutional Performance',
];

export function BrandMotionStrip() {
  return (
    <div className={styles.strip} aria-label="BRAINTEK connected capabilities">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div className={styles.set} key={copy} aria-hidden={copy === 1}>
            {signals.map((signal) => (
              <span className={styles.item} key={`${copy}-${signal}`}>
                <b>{signal}</b>
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
