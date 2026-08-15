import crypto from 'node:crypto';

const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_WINDOW = 8;
const WINDOW_MS = 10 * 60 * 1000;

const baseAllowedTypes = new Set([
  'consultation',
  'general',
  'partnership',
  'platform',
  'download',
]);

function clean(value: unknown, max = 500) {
  if (typeof value !== 'string') return '';

  return value
    .trim()
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .slice(0, max);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function rateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return false;
  }

  current.count += 1;

  return current.count > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return value.replace(/[&<>"']/g, (char) => entities[char] || char);
}

export default {
  async create(ctx) {
    let allowedTypes = baseAllowedTypes;

    try {
      const formConfig = await strapi
        .documents('api::form-configuration.form-configuration')
        .findFirst();

      if (Array.isArray(formConfig?.inquiry_types)) {
        const configured = formConfig.inquiry_types
          .map((item: any) =>
            typeof item === 'object' && item
              ? clean(item.value, 40)
              : ''
          )
          .filter((value: string) => baseAllowedTypes.has(value));

        if (configured.length) {
          allowedTypes = new Set(configured);
        }
      }
    } catch {}

    const ip = clean(ctx.request.ip || ctx.ip || 'unknown', 120);

    const hash = crypto
      .createHash('sha256')
      .update(
        `${ip}:${process.env.API_TOKEN_SALT || 'braintek'}`
      )
      .digest('hex');

    if (rateLimited(hash)) {
      return ctx.tooManyRequests(
        'Too many submissions. Please try again later.'
      );
    }

    const body = ctx.request.body || {};

    if (body.website) {
      ctx.status = 202;
      ctx.body = { ok: true };
      return;
    }

    const data = {
      form_type: allowedTypes.has(body.form_type)
        ? body.form_type
        : 'general',

      full_name: clean(body.full_name, 120),
      organization: clean(body.organization, 180),
      role_title: clean(body.role_title, 160),
      email: clean(body.email, 180).toLowerCase(),
      phone: clean(body.phone, 60),
      sector_interest: clean(body.sector_interest, 180),
      service_interest: clean(body.service_interest, 220),
      product_interest: clean(body.product_interest, 160),
      preferred_followup: clean(body.preferred_followup, 80),
      message: clean(body.message, 4000),

      status: 'NEW' as const,

      source_url: clean(
        body.source_url || ctx.request.header.referer,
        500
      ),

      ip_hash: hash,
    };

    if (
      !data.full_name ||
      !data.organization ||
      !data.email ||
      !data.message ||
      !validEmail(data.email)
    ) {
      return ctx.badRequest(
        'Please provide a valid name, organization, email, and message.'
      );
    }

    const created = await strapi
      .documents('api::form-submission.form-submission')
      .create({
        data,
      });

    await strapi
      .documents(
        'api::submission-status-log.submission-status-log'
      )
      .create({
        data: {
          submission_document_id: created.documentId,

          submission: {
            documentId: created.documentId,
          },

          previous_status: '',
          new_status: 'NEW',
          changed_by: 'public-form',
          note: 'Inquiry received from public website.',
          changed_at: new Date().toISOString(),
        },
      });

    let configuredEmail = '';

    try {
      const formConfig = await strapi
        .documents('api::form-configuration.form-configuration')
        .findFirst();

      if (Array.isArray(formConfig?.notification_emails)) {
        configuredEmail = clean(
          formConfig.notification_emails[0],
          180
        );
      }
    } catch {}

    const notificationEmail = clean(
      process.env.INQUIRY_NOTIFICATION_EMAIL ||
        configuredEmail,
      180
    );

    if (
      notificationEmail &&
      validEmail(notificationEmail)
    ) {
      try {
        await strapi
          .plugin('email')
          .service('email')
          .send({
            to: notificationEmail,
            replyTo: data.email,

            subject:
              `[BRAINTEK Inquiry] ` +
              `${data.organization} — ${data.form_type}`,

            text:
              `New BRAINTEK inquiry\n\n` +
              `Name: ${data.full_name}\n` +
              `Organization: ${data.organization}\n` +
              `Role: ${data.role_title || '-'}\n` +
              `Email: ${data.email}\n` +
              `Phone: ${data.phone || '-'}\n` +
              `Type: ${data.form_type}\n` +
              `Sector: ${data.sector_interest || '-'}\n` +
              `Service: ${data.service_interest || '-'}\n` +
              `Product: ${data.product_interest || '-'}\n` +
              `Preferred follow-up: ${data.preferred_followup || '-'}\n\n` +
              `Message:\n${data.message}\n\n` +
              `Reference: ${created.documentId}`,

            html:
              `<h2>New BRAINTEK inquiry</h2>` +
              `<p><strong>Name:</strong> ${escapeHtml(data.full_name)}</p>` +
              `<p><strong>Organization:</strong> ${escapeHtml(data.organization)}</p>` +
              `<p><strong>Role:</strong> ${escapeHtml(data.role_title || '-')}</p>` +
              `<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>` +
              `<p><strong>Phone:</strong> ${escapeHtml(data.phone || '-')}</p>` +
              `<p><strong>Type:</strong> ${escapeHtml(data.form_type)}</p>` +
              `<p><strong>Sector:</strong> ${escapeHtml(data.sector_interest || '-')}</p>` +
              `<p><strong>Service:</strong> ${escapeHtml(data.service_interest || '-')}</p>` +
              `<p><strong>Product:</strong> ${escapeHtml(data.product_interest || '-')}</p>` +
              `<p><strong>Preferred follow-up:</strong> ${escapeHtml(data.preferred_followup || '-')}</p>` +
              `<p><strong>Message:</strong><br>` +
              `${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>` +
              `<p><strong>Reference:</strong> ${escapeHtml(created.documentId)}</p>`,
          });
      } catch (error) {
        strapi.log.error(
          `Inquiry ${created.documentId} was stored but notification email failed: ${
            error instanceof Error
              ? error.message
              : 'Unknown email error'
          }`
        );
      }
    }

    ctx.status = 201;

    ctx.body = {
      ok: true,
      reference: created.documentId,
    };
  },
};