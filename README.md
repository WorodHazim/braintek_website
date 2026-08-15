# BRAINTEK Digital Platform

Production-oriented monorepo for the BRAINTEK AI Solutions & Consultancies public website, Strapi CMS, PostgreSQL data layer, and BRAINTEK Operations inquiry-management dashboard.

The project follows the approved three-pillar public positioning:

1. Cybersecurity & Digital Protection
2. Software Solutions & Systems Development
3. Manpower Development & Workforce Empowerment

The supplied BRAINTEK logo is already integrated into the public website and Strapi administration branding.

## What is included

### Public website
- Full strategic homepage with all required homepage sections.
- About, Services, Sectors, Platforms & Products, Why BRAINTEK, Expert Team, Partners, Insights & Resources, Contact and legal routes.
- 10 reusable service-detail routes.
- 6 sector-detail routes.
- 6 product/platform-detail routes.
- Resource/article detail routes.
- Search experience across services, sectors, platforms and resources.
- CMS preview mode for draft content.
- Dynamic sitemap, robots configuration, Open Graph image, JSON-LD, breadcrumbs and canonical metadata.
- Responsive editorial design and reduced-motion behavior.
- GSAP + Motion animation layer using SVG/CSS-driven visual systems rather than generic AI imagery.

### CMS and administration
- Strapi CMS with structured content models for pages, sections, services, sectors, products, resources, authors, FAQs, CTAs, team members, partners, testimonials, case studies, media metadata, downloads, site settings and form configuration.
- Draft/review/published/archived workflow fields for governed content.
- Branded `BRAINTEK Operations` admin extension for inquiry workflow management.
- Role/permission documentation for Super Admin, Content Manager, Marketing Editor, Insights/Resource Editor, Service/Product Editor and Inquiry Reviewer.

### Inquiry / lead operations
- Public structured consultation form.
- Server-side validation and sanitization.
- Honeypot and basic rate limiting.
- PostgreSQL persistence before notification email.
- Status workflow: `NEW`, `IN_REVIEW`, `CONTACTED`, `QUALIFIED`, `CLOSED`, `ARCHIVED`.
- Assignee, internal notes, follow-up date and activity history.
- Automatic `submission_status_log` records for status changes.
- Dashboard distributions for status, service, sector, product and inquiry type.
- Demo operational records are explicitly labelled `[DEMO]` when seed mode is enabled.

### Production foundation
- PostgreSQL 17 development container.
- Development and reference production Docker Compose files.
- Health routes for web and CMS.
- SMTP-ready email provider configuration.
- Optional S3/S3-compatible media storage configuration.
- Security headers and protected preview secret.
- CI workflow example.
- Deployment, security, backup/restore, role, CMS and operations documentation.

## Quick start — Windows

1. Copy `.env.example` to `.env`.
2. Replace the placeholder secrets in `.env`.
3. Run:

```bat
start-windows.bat
```

Or directly:

```bash
docker compose up --build
```

Then open:

- Website: `http://localhost:3000`
- Strapi admin: `http://localhost:1337/admin`

Create the first Strapi administrator when prompted.

## Quick start — macOS / Linux

```bash
cp .env.example .env
chmod +x start-mac-linux.sh
./start-mac-linux.sh
```

## Local development without Docker

Use a supported Node.js version and a PostgreSQL database, then:

```bash
npm install
npm run dev:cms
```

In another terminal:

```bash
npm run dev:web
```

## CMS content access

The public site contains approved source-derived fallback content so the frontend remains useful during initial CMS setup. For production, create a Strapi read API token and set:

```env
STRAPI_API_TOKEN=...
```

Keep this token server-side only. Do not expose it through a `NEXT_PUBLIC_` variable.

## Preview mode

Set the same long random `PREVIEW_SECRET` for the web and CMS environments. Strapi preview opens the protected Next.js `/api/preview` route, verifies the requested document through the CMS, enables draft mode and redirects to the corresponding page.

## Email

Local development can use the configured sendmail fallback. Production should configure the SMTP variables in `.env` / the platform secret store:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USERNAME=
SMTP_PASSWORD=
```

Lead persistence does not depend on successful notification email delivery: the inquiry is stored first, and notification failure is logged without discarding the lead.

## Production media storage

When `S3_BUCKET` is configured, Strapi uses the S3 upload provider. This works with AWS S3 or compatible object-storage services that expose the required S3 API behavior.

```env
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_ACCESS_SECRET=
S3_ENDPOINT=
CDN_URL=
```

For local development, leave `S3_BUCKET` empty and Strapi uses local upload storage.

## Seed data

With:

```env
SEED_DEMO_CONTENT=true
```

an empty development CMS is populated with source-derived BRAINTEK:
- pages
- 10 services
- 6 sectors
- 6 platforms/products
- 10 team records
- 6 documented partners/collaborators
- initial Insights & Resources entries
- form configuration
- site settings
- clearly labelled demo inquiry records

Set `SEED_DEMO_CONTENT=false` after validating production content.

## Important content safeguards

- The public site consistently uses the current three-pillar BRAINTEK positioning.
- SentinelShield is labelled as a proposed solution concept.
- OpsPilot uses strategic/configurable platform maturity language.
- Partner wording preserves `potential` / `possible` collaboration language where supplied.
- No fabricated client results, project metrics or deployment claims are included.
- Team profiles use initials-based role visuals until real approved portraits are supplied.
- Product pages use clearly conceptual interface placeholders until approved screenshots are uploaded.
- Legal pages are marked for final approved legal copy before go-live.

## Asset status

Already integrated:
- supplied BRAINTEK PNG logo

Recommended before final public launch:
- vector/SVG BRAINTEK logo and approved favicon if available
- real team portraits
- real PSYTEST, AILEX, Scheduler and Skoolee screenshots
- approved partner logo files and public-use confirmation
- final legal/privacy/cookie wording
- brochures/company profile/downloadable resources if available

See `docs/ASSET_HANDOFF.md`.

## Documentation

- `docs/DEPLOYMENT.md` — environments, topology and release flow
- `docs/CMS_GUIDE.md` — content operations and preview workflow
- `docs/CONTENT_GOVERNANCE.md` — positioning, claims and publishing safeguards
- `docs/ROLE_MATRIX.md` — administrative RBAC model
- `docs/SECURITY.md` — security configuration and go-live checks
- `docs/BACKUP_RESTORE.md` — backup and recovery procedure
- `docs/OPERATIONS_RUNBOOK.md` — operational checks and incident handling
- `docs/ASSET_HANDOFF.md` — assets still required for the final branded launch
- `BUILD_REPORT.md` — implementation inventory and validation notes

## Production reminders

Before go-live:
- change every placeholder secret
- set `SEED_DEMO_CONTENT=false`
- create least-privilege CMS users and roles
- configure SMTP
- configure object storage
- use managed PostgreSQL with backups/PITR where appropriate
- protect Strapi administration
- put the public application behind the selected CDN/WAF/reverse-proxy architecture
- validate forms, analytics, consent/legal text, accessibility, metadata, redirects and all supplied assets in staging
- perform and document a restore test

