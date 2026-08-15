# BRAINTEK admin role matrix

Use Strapi Settings -> Administration Panel -> Roles to create these roles after the first Super Admin account is created. The BRAINTEK Operations plugin registers separate permissions for dashboard access and inquiry updates, so inquiry handling can be isolated from publishing.

| Role | Public content | Publish | SEO / CTA | Insights | Services / Products | Inquiries | Users / settings |
|---|---|---|---|---|---|---|---|
| Super Admin | Full | Full | Full | Full | Full | Full | Full |
| Content Manager | Pages, services, sectors, shared content | Yes | Page-level | Review | Review | Read only if required | No |
| Marketing Editor | Selected pages/campaign content | Review-gated | Yes | Optional | Read | No | No |
| Insights / Resource Editor | Read | Insights/resources only | Resource SEO | Full | Read relations | No | No |
| Service / Product Editor | Read | Assigned service/product types | Their SEO | Read | Full assigned types | No | No |
| Inquiry Reviewer | No editing | No | No | No | Read reference data | View/update, notes, follow-up | No |

## BRAINTEK Operations plugin actions
- `plugin::braintek-ops.overview.access`: dashboard, inquiry list, inquiry detail.
- `plugin::braintek-ops.inquiries.update`: status, assignee, internal notes and follow-up updates.

Recommended assignment:
- Inquiry Reviewer: both actions.
- Content Manager: overview only if operational visibility is needed.
- Super Admin: both actions.

Do not give publication permissions to Inquiry Reviewer accounts.
