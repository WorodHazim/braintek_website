import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { TeamRail, type TeamMember } from './TeamRail';
import styles from './HomeTeam.module.css';

type HomeTeamProps = {
  members: TeamMember[];
};

export function HomeTeam({ members }: HomeTeamProps) {
  return (
    <section className={styles.section} aria-labelledby="home-team-title">
      <div className={`container ${styles.intro}`} data-reveal>
        <p className={styles.kicker}>Expert team</p>
        <div>
          <h2 id="home-team-title">Strategic, technical and human-capability depth behind the work.</h2>
          <p>
            Expertise across leadership, software engineering, AI enablement, cybersecurity,
            cloud, data protection and workforce development.
          </p>
          <Link className={styles.link} href="/expert-team">
            Meet the expert team <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <TeamRail members={members} compact />
    </section>
  );
}
