# BRAINTEK Deployment Guide

## Environment model

Maintain three separated environments:

1. Development — local engineering and CMS model work.
2. Staging — production-like QA, content approval, accessibility checks, security checks and UAT.
3. Production — approved releases and controlled publishing only.

Do not point development or staging at the production database or production media bucket.

## Recommended production topology

- **Public web:** Next.js runtime or container behind the selected CDN/WAF/reverse proxy.
- **CMS/API:** separate Strapi service. Keep the administrative surface protected and separate from the public web runtime.
- **Database:** managed PostgreSQL with private networking where possible, automated backups and point-in-time recovery according to the approved operations policy.
- **Media:** object storage in production. The project includes an optional S3/S3-compatible provider configuration activated by `S3_BUCKET`.
- **Email:** production SMTP provider configured through environment secrets.
- **Secrets:** hosting secret store or protected environment variables only.

`docker-compose.prod.example.yml` demonstrates service separation, but it is a reference topology rather than a substitute for the final cloud/network design.

## Required production environment values

At minimum configure strong values for:

```env
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
PREVIEW_SECRET=
DATABASE_HOST=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
FRONTEND_URL=https://braintek.ae
PUBLIC_URL=https://cms.example.braintek.ae
NEXT_PUBLIC_SITE_URL=https://braintek.ae
STRAPI_URL=https://cms.example.braintek.ae
STRAPI_API_TOKEN=
INQUIRY_NOTIFICATION_EMAIL=info@braintek.ae
SMTP_HOST=
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
```

For production object storage:

```env
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_ACCESS_SECRET=
S3_ENDPOINT=
CDN_URL=
```

Do not commit `.env.production`.

## Public CMS read token

The Next.js application is designed to use a server-only Strapi API token when CMS public permissions are not opened broadly. Create a least-privilege token with read access to the public content types required by the website and set `STRAPI_API_TOKEN` only on the web server/runtime.

## Preview flow

1. Set the same `PREVIEW_SECRET` in the CMS and public-web runtime.
2. Strapi builds a preview URL for the selected document.
3. Next.js verifies the secret.
4. Next.js verifies that the requested draft document exists through the CMS using the server-side API token.
5. Draft mode is enabled only after the checks succeed.
6. `/api/exit-preview` disables preview mode.

## Release workflow

1. Feature branch / pull request.
2. Automated install, web build, CMS build and web lint.
3. Merge to the protected release branch.
4. Deploy to staging.
5. Run page, content, form, permission, SEO, responsive and accessibility QA.
6. Confirm current database/media backup state and rollback target.
7. Obtain production approval.
8. Deploy production release.
9. Run post-deployment smoke checks.
10. Record release version, time, approver and rollback reference.

The repository includes `.github/workflows/ci.yml` as a baseline CI example.

## Release gates

### Build gate
- dependencies install successfully
- Next.js build succeeds
- Strapi/admin build succeeds
- frontend lint has no unresolved critical failures

### Content gate
- homepage and major landing-page content approved
- partner wording/permissions approved
- product maturity wording correct
- team data approved
- metadata and social images checked

### Security gate
- no placeholder secrets
- production debug output disabled
- admin access protected
- rate limiting/spam controls tested
- upload restrictions reviewed
- SMTP/object-storage credentials protected

### Business-flow gate
- consultation submission is stored in PostgreSQL
- initial status history exists
- notification path tested
- inquiry appears in BRAINTEK Operations
- assignee/status/notes/follow-up updates work

### Performance/accessibility gate
- key pages checked on mobile and desktop
- reduced-motion path verified
- keyboard navigation and focus visibility verified
- large media optimized

## Health checks

- Web: `/api/health`
- CMS: `/api/health`

Monitor public web, CMS/API and database availability separately.

## Media behavior

### Local development
When `S3_BUCKET` is empty, Strapi uses local upload storage under `public/uploads`. Docker development persists it through a named volume.

### Production
Configure the S3 variables so uploads are stored outside the application filesystem. If a CDN fronts the media bucket, set `CDN_URL` to the approved public media base URL.

Validate upload, delete, cache headers, content types and access policy in staging before production migration.

## Rollback

Keep at least one known-good application release immediately deployable. A release rollback may involve:

- reverting the Next.js deployment
- reverting Strapi application/plugin code
- reverting a schema migration only through an explicitly tested migration plan
- restoring content/database state only when application rollback is insufficient

Never restore production data casually to solve a code-only problem.

## Go-live smoke test

After deployment verify:

- `/`, `/about`, `/services`, `/sectors`, `/platforms-products`, `/why-braintek`, `/expert-team`, `/partners`, `/insights-resources`, `/contact`
- one service detail
- one sector detail
- one platform detail
- one insight/resource detail
- search
- sitemap and robots
- canonical and Open Graph metadata
- CMS login
- draft preview
- consultation submission
- lead record and status log
- dashboard search/filter/update workflow
- email notification
- media upload/rendering
- mobile navigation
- reduced-motion behavior

