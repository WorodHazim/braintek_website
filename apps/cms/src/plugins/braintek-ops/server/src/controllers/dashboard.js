'use strict';
const STATUSES = ['NEW','IN_REVIEW','CONTACTED','QUALIFIED','CLOSED','ARCHIVED'];
const CONTENT_UIDS = [
  'api::page.page','api::service.service','api::sector.sector','api::product.product','api::resource.resource','api::team-member.team-member','api::partner.partner'
];

function distribution(rows, field) {
  const result = {};
  for (const row of rows) {
    const key = row[field] || 'Not specified';
    result[key] = (result[key] || 0) + 1;
  }
  return Object.entries(result).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([label,value])=>({ label, value }));
}

module.exports = ({ strapi }) => ({
  async summary(ctx) {
    const uid = 'api::form-submission.form-submission';
    const submissions = await strapi.documents(uid).findMany({ fields: ['full_name','organization','email','form_type','sector_interest','service_interest','product_interest','status','assignee','follow_up_at'], sort: ['createdAt:desc'], limit: 1000 });
    const total = await strapi.documents(uid).count();
    const countPairs = await Promise.all(STATUSES.map(async (status) => [status, await strapi.documents(uid).count({ filters:{ status } })]));
    const counts = Object.fromEntries(countPairs);
    const now = new Date().toISOString();
    const overdueFollowUps = await strapi.documents(uid).count({ filters:{ follow_up_at:{ $lt:now, $notNull:true }, status:{ $notIn:['CLOSED','ARCHIVED'] } } });

    let reviewCount = 0;
    const recentlyPublished = [];
    for (const contentUid of CONTENT_UIDS) {
      try {
        reviewCount += await strapi.documents(contentUid).count({ filters: { workflow_status: 'review' } });
        const items = await strapi.documents(contentUid).findMany({ filters: { workflow_status: 'published' }, sort: ['updatedAt:desc'], limit: 3 });
        for (const item of items) recentlyPublished.push({ uid: contentUid, documentId: item.documentId, title: item.title || item.name || 'Content item', updatedAt: item.updatedAt });
      } catch (_) {}
    }
    recentlyPublished.sort((a,b)=>new Date(b.updatedAt).getTime()-new Date(a.updatedAt).getTime());

    ctx.body = {
      total,
      distributionSampleSize: submissions.length,
      counts,
      overdueFollowUps,
      recent: submissions.slice(0,8),
      distributions: {
        type: distribution(submissions,'form_type'),
        service: distribution(submissions,'service_interest'),
        sector: distribution(submissions,'sector_interest'),
        product: distribution(submissions,'product_interest')
      },
      content: { requiringReview: reviewCount, recentlyPublished: recentlyPublished.slice(0,8) }
    };
  },

  async submissions(ctx) {
    const { status, q, form_type, sector, service, product, assignee } = ctx.query || {};
    const requestedPage = Number.parseInt(String(ctx.query?.page || '1'), 10);
    const requestedPageSize = Number.parseInt(String(ctx.query?.pageSize || '50'), 10);
    const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const pageSize = Number.isFinite(requestedPageSize) ? Math.min(100, Math.max(10, requestedPageSize)) : 50;
    const filters = {};
    if (status && STATUSES.includes(status)) filters.status = status;
    if (form_type) filters.form_type = form_type;
    if (sector) filters.sector_interest = { $containsi: sector };
    if (service) filters.service_interest = { $containsi: service };
    if (product) filters.product_interest = { $containsi: product };
    if (assignee) filters.assignee = { $containsi: assignee };
    if (q) filters.$or = [
      { full_name: { $containsi: q } },
      { organization: { $containsi: q } },
      { email: { $containsi: q } },
      { message: { $containsi: q } }
    ];
    const total = await strapi.documents('api::form-submission.form-submission').count({ filters });
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, pageCount);
    const data = await strapi.documents('api::form-submission.form-submission').findMany({ fields: ['full_name','organization','role_title','email','phone','form_type','sector_interest','service_interest','product_interest','preferred_followup','status','assignee','follow_up_at'], filters, sort: ['createdAt:desc'], start: (safePage - 1) * pageSize, limit: pageSize });
    ctx.body = { data, meta: { pagination: { page: safePage, pageSize, pageCount, total } } };
  },

  async submission(ctx) {
    const { documentId } = ctx.params;
    const data = await strapi.documents('api::form-submission.form-submission').findOne({ documentId, fields: ['full_name','organization','role_title','email','phone','form_type','sector_interest','service_interest','product_interest','preferred_followup','message','status','assignee','internal_notes','follow_up_at'] });
    if (!data) return ctx.notFound('Submission not found');
    const history = await strapi.documents('api::submission-status-log.submission-status-log').findMany({
      filters: { submission_document_id: documentId }, sort: ['changed_at:desc'], limit: 100
    });
    ctx.body = { data, history };
  },

  async updateSubmission(ctx) {
    const { documentId } = ctx.params;
    const body = ctx.request.body || {};
    const allowed = {};
    if (body.status && STATUSES.includes(body.status)) allowed.status = body.status;
    if (typeof body.assignee === 'string') allowed.assignee = body.assignee.trim().slice(0, 180);
    if (typeof body.internal_notes === 'string') allowed.internal_notes = body.internal_notes.slice(0, 5000);
    if (body.follow_up_at === null || typeof body.follow_up_at === 'string') allowed.follow_up_at = body.follow_up_at || null;

    const previous = await strapi.documents('api::form-submission.form-submission').findOne({ documentId, fields: ['status'] });
    if (!previous) return ctx.notFound('Submission not found');

    await strapi.documents('api::form-submission.form-submission').update({ documentId, data: allowed });
    const statusChanged = allowed.status && allowed.status !== previous.status;
    const note = typeof body.note === 'string' ? body.note.trim().slice(0, 2000) : '';
    if (statusChanged || note) {
      await strapi.documents('api::submission-status-log.submission-status-log').create({ data: {
        submission_document_id: documentId,
        submission: { connect: [documentId] },
        previous_status: previous.status || '',
        new_status: allowed.status || previous.status || 'NEW',
        changed_by: ctx.state.user?.email || ctx.state.user?.firstname || 'admin',
        note: note || 'Status updated in BRAINTEK Operations.',
        changed_at: new Date().toISOString()
      }});
    }
    const updated = await strapi.documents('api::form-submission.form-submission').findOne({ documentId, fields: ['full_name','organization','role_title','email','phone','form_type','sector_interest','service_interest','product_interest','preferred_followup','message','status','assignee','internal_notes','follow_up_at'] });
    ctx.body = { data: updated };
  }
});
