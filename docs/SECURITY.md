# Security implementation and production checklist

## Application controls already present
- Secrets are environment-driven; no production credentials belong in source control.
- Public inquiry endpoint performs server-side validation, input length limits, honeypot detection and request throttling.
- Public inquiry IP information is retained only as a salted SHA-256 hash for abuse controls.
- Lead records persist before notification email is attempted, so email delivery failure does not lose the inquiry.
- Inquiry status changes are written to a separate workflow history collection.
- Preview mode requires `PREVIEW_SECRET` and a server-side Strapi API token for draft retrieval.
- Admin lead operations use Strapi RBAC plugin actions.
- Next.js sends baseline security headers. Strapi has security and CORS middleware enabled.

## Before production
1. Generate independent random values for `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, and `PREVIEW_SECRET`.
2. Disable `SEED_DEMO_CONTENT` after staging validation.
3. Configure production SMTP and test the contact flow end to end.
4. Protect the Strapi admin surface with MFA plus network/identity controls where available.
5. Use managed PostgreSQL private connectivity and a least-privilege application user.
6. Put the public site behind CDN/WAF and add infrastructure-level rate limiting/bot protection.
7. Configure object storage with file-size/type policies before allowing editors to upload production media.
8. Centralize application logs and ensure they do not contain secrets or unnecessary personal data.
9. Enable dependency and container image vulnerability scanning in CI.
10. Validate HTTPS, HSTS, DNS ownership and certificate renewal before launch.

## Data minimization
Only business inquiry data required for qualification and follow-up should be collected. Define retention periods for closed/archived inquiries with BRAINTEK management and approved legal/privacy guidance before launch.

## Object-storage security

When production S3/S3-compatible storage is enabled:
- use a dedicated least-privilege access key/service account
- scope permissions to the required bucket/actions only
- do not expose access keys to the browser
- prefer a controlled CDN/public-read strategy for published media rather than making administrative storage broadly writable
- enable object versioning/retention where the selected provider and policy support it
- review CORS and content-type behavior in staging
