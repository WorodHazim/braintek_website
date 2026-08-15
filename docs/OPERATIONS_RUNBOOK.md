# Production operations runbook

## Daily during launch / active campaigns
- Check public-site and CMS health endpoints.
- Check failed form submissions and application errors.
- Confirm recent inquiry records are visible in BRAINTEK Operations.
- Confirm backup jobs report success.

## Weekly
- Smoke-test Home, About, Services, Sectors, Platforms, Why BRAINTEK, Insights and Contact on desktop/mobile.
- Submit a controlled test inquiry and confirm storage, notification, dashboard visibility and status updates.
- Review recent publishing for broken links, images and metadata.
- Review suspicious admin logins/form abuse.
- Review application/database resource utilization.

## Monthly
- Review framework/CMS/package security updates in staging.
- Audit admin roles and privileged accounts.
- Review sitemap, structured data, canonical URLs and redirects.
- Review performance and form quality.

## Quarterly
- Execute restore drill.
- Review CDN/WAF, DNS, SSL and admin access controls.
- Review infrastructure capacity and backup retention.
- Review incident history and recurring problems.

## Incident severity
- S1 Critical: site unavailable, forms failing, database unavailable, active compromise.
- S2 High: major workflow/content publishing degradation or severe performance failure.
- S3 Medium: isolated feature/page issue without broad business interruption.
- S4 Low: cosmetic issue or low-risk enhancement.

For S1/S2: stabilize impact first, assign one incident lead, inspect the most recent change, choose the smallest safe fix or rollback, validate the complete business flow, then record the incident and preventive action.
