# Backup and restore runbook

## Required backup scope
- PostgreSQL content and operational data.
- Strapi media/object storage.
- Deployment manifests and non-secret configuration references.
- Release tags/artifacts required to restore the previous application version.

## Recommended cadence
- Database logical backup: daily, 14-30 day retention.
- PostgreSQL point-in-time recovery: continuous, at least 7-14 days.
- Media/object-storage versioning or replication: daily, 30-90 days.
- Infrastructure/config references: on change plus weekly archive.
- Release references: retain at least 10 production releases.

## Restore drill
Perform once before go-live and at least quarterly:
1. Restore the latest database backup into an isolated staging database.
2. Restore or reconnect a copy of media storage.
3. Start Strapi against the restored database.
4. Validate published content, users/roles, lead history and resource records.
5. Start Next.js and verify homepage, one dynamic service, sector, product and resource route.
6. Submit a test inquiry and confirm persistence/status history.
7. Record restore duration, backup timestamp and any gaps.

RTO and RPO values are intentionally not invented in this project; BRAINTEK management must approve the acceptable restoration time and data-loss window for the selected hosting plan.
