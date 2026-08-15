import crypto from 'node:crypto';

const STATUSES = new Set(['NEW','IN_REVIEW','CONTACTED','QUALIFIED','CLOSED','ARCHIVED']);

function clean(value: unknown, max = 500) {
  if (typeof value !== 'string') return '';
  return value.normalize('NFKC').trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max);
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function allowed(ctx: any) {
  const expected = process.env.DASHBOARD_API_KEY || '';
  const received = clean(ctx.request.headers['x-braintek-dashboard-key'], 500);
  if (!expected || !received || !safeEqual(received, expected)) {
    ctx.unauthorized('Dashboard access denied.');
    return false;
  }
  return true;
}

function actor(ctx: any) {
  return clean(ctx.request.headers['x-braintek-dashboard-user'], 180) || 'braintek-dashboard';
}

function pageNumber(value: unknown, fallback: number, max: number) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), max) : fallback;
}

function safeSubmission(item: any, includePrivate = false) {
  if (!item) return null;
  const out: Record<string, unknown> = {
    id: item.id,
    documentId: item.documentId,
    form_type: item.form_type,
    full_name: item.full_name,
    organization: item.organization,
    role_title: item.role_title,
    email: item.email,
    phone: item.phone,
    sector_interest: item.sector_interest,
    service_interest: item.service_interest,
    product_interest: item.product_interest,
    preferred_followup: item.preferred_followup,
    message: item.message,
    status: item.status,
    assignee: item.assignee,
    follow_up_at: item.follow_up_at,
    source_url: item.source_url,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
  if (includePrivate) out.internal_notes = item.internal_notes || '';
  return out;
}

async function createLog(documentId: string, previousStatus: string, newStatus: string, changedBy: string, note: string) {
  return strapi.db.query('api::submission-status-log.submission-status-log').create({
    data: {
      submission_document_id: documentId,
      previous_status: previousStatus,
      new_status: newStatus,
      changed_by: changedBy,
      note,
      changed_at: new Date().toISOString(),
    },
  });
}

export default {
  async summary(ctx: any) {
    if (!allowed(ctx)) return;
    const q = strapi.db.query('api::form-submission.form-submission');
    const [total, fresh, review, contacted, qualified, closed, archived, recent, services, sectors, products, resources, team, partners] = await Promise.all([
      q.count(),
      q.count({ where: { status: 'NEW' } }),
      q.count({ where: { status: 'IN_REVIEW' } }),
      q.count({ where: { status: 'CONTACTED' } }),
      q.count({ where: { status: 'QUALIFIED' } }),
      q.count({ where: { status: 'CLOSED' } }),
      q.count({ where: { status: 'ARCHIVED' } }),
      q.findMany({ orderBy: { createdAt: 'desc' }, limit: 6 }),
      strapi.db.query('api::service.service').count(),
      strapi.db.query('api::sector.sector').count(),
      strapi.db.query('api::product.product').count(),
      strapi.db.query('api::resource.resource').count(),
      strapi.db.query('api::team-member.team-member').count(),
      strapi.db.query('api::partner.partner').count(),
    ]);
    ctx.body = { data: { counts: { total, NEW: fresh, IN_REVIEW: review, CONTACTED: contacted, QUALIFIED: qualified, CLOSED: closed, ARCHIVED: archived }, recent: recent.map((x: any) => safeSubmission(x)), content: { services, sectors, products, resources, team_members: team, partners } } };
  },

  async list(ctx: any) {
    if (!allowed(ctx)) return;
    const page = pageNumber(ctx.query.page, 1, 100000);
    const pageSize = pageNumber(ctx.query.pageSize, 25, 100);
    const status = clean(ctx.query.status, 30);
    const search = clean(ctx.query.q, 140);
    const where: Record<string, unknown> = {};
    if (status && STATUSES.has(status)) where.status = status;
    if (search) where.$or = [
      { full_name: { $containsi: search } },
      { organization: { $containsi: search } },
      { email: { $containsi: search } },
      { phone: { $containsi: search } },
      { message: { $containsi: search } },
      { service_interest: { $containsi: search } },
      { sector_interest: { $containsi: search } },
      { product_interest: { $containsi: search } },
    ];
    const q = strapi.db.query('api::form-submission.form-submission');
    const [items, total] = await Promise.all([
      q.findMany({ where, orderBy: { createdAt: 'desc' }, offset: (page - 1) * pageSize, limit: pageSize }),
      q.count({ where }),
    ]);
    ctx.body = { data: items.map((x: any) => safeSubmission(x)), meta: { pagination: { page, pageSize, pageCount: Math.max(1, Math.ceil(total / pageSize)), total } } };
  },

  async one(ctx: any) {
    if (!allowed(ctx)) return;
    const documentId = clean(ctx.params.documentId, 120);
    const submission = await strapi.db.query('api::form-submission.form-submission').findOne({ where: { documentId } });
    if (!submission) return ctx.notFound('Submission not found.');
    const history = await strapi.db.query('api::submission-status-log.submission-status-log').findMany({ where: { submission_document_id: documentId }, orderBy: { changed_at: 'desc' }, limit: 250 });
    ctx.body = { data: { ...safeSubmission(submission, true), status_history: history.map((x: any) => ({ id: x.id, documentId: x.documentId, previous_status: x.previous_status, new_status: x.new_status, changed_by: x.changed_by, note: x.note, changed_at: x.changed_at })) } };
  },

  async update(ctx: any) {
    if (!allowed(ctx)) return;
    const documentId = clean(ctx.params.documentId, 120);
    const q = strapi.db.query('api::form-submission.form-submission');
    const existing = await q.findOne({ where: { documentId } });
    if (!existing) return ctx.notFound('Submission not found.');
    const body = ctx.request.body || {};
    const data: Record<string, unknown> = {};
    if (typeof body.status === 'string' && STATUSES.has(body.status)) data.status = body.status;
    if (typeof body.assignee === 'string') data.assignee = clean(body.assignee, 180);
    if (typeof body.internal_notes === 'string') data.internal_notes = clean(body.internal_notes, 8000);
    if (body.follow_up_at === null || body.follow_up_at === '') data.follow_up_at = null;
    else if (typeof body.follow_up_at === 'string') {
      const parsed = Date.parse(body.follow_up_at);
      if (Number.isNaN(parsed)) return ctx.badRequest('Invalid follow-up date.');
      data.follow_up_at = new Date(parsed).toISOString();
    }
    const updated = await q.update({ where: { documentId }, data });
    const previousStatus = existing.status || 'NEW';
    const newStatus = typeof data.status === 'string' ? data.status : previousStatus;
    const note = clean(body.note, 2000);
    if (newStatus !== previousStatus || note) {
      await createLog(documentId, previousStatus, newStatus, actor(ctx), note || `Status changed from ${previousStatus} to ${newStatus}.`);
    }
    ctx.body = { data: safeSubmission(updated, true) };
  },

  async log(ctx: any) {
    if (!allowed(ctx)) return;
    const documentId = clean(ctx.params.documentId, 120);
    const note = clean(ctx.request.body?.note, 2000);
    if (!note) return ctx.badRequest('A note is required.');
    const submission = await strapi.db.query('api::form-submission.form-submission').findOne({ where: { documentId } });
    if (!submission) return ctx.notFound('Submission not found.');
    const log = await createLog(documentId, submission.status || 'NEW', submission.status || 'NEW', actor(ctx), note);
    ctx.status = 201;
    ctx.body = { data: { id: log.id, documentId: log.documentId, previous_status: log.previous_status, new_status: log.new_status, changed_by: log.changed_by, note: log.note, changed_at: log.changed_at } };
  },
};
