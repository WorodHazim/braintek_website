import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::case-study.case-study',
  ({ strapi }) => ({
    async portfolioFeed(ctx) {
      const entries = await strapi
        .documents('api::case-study.case-study')
        .findMany({
          status: 'published',
          populate: ['cover', 'gallery'],
          sort: ['sort_order:asc', 'publishedAt:desc'],
        });

      ctx.body = {
        data: entries
          .filter(
            (item: any) =>
              !item.workflow_status ||
              item.workflow_status === 'published',
          )
          .map((item: any) => ({
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            slug: item.slug,
            client_type: item.client_type || '',
            client_name: item.client_name || '',
            project_summary: item.project_summary || '',
            project_date: item.project_date || null,
            challenge: item.challenge || '',
            solution: item.solution || '',
            outcome_summary: item.outcome_summary || '',
            client_review: item.client_review || '',
            client_review_name: item.client_review_name || '',
            featured: Boolean(item.featured),
            cover: item.cover || null,
            gallery: Array.isArray(item.gallery) ? item.gallery : [],
            meta_title: item.meta_title || '',
            meta_description: item.meta_description || '',
          })),
      };
    },
  }),
);
