import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::news-item.news-item',
  ({ strapi }) => ({
    async feed(ctx) {
      const now = Date.now();

      const entries = await strapi
        .documents('api::news-item.news-item')
        .findMany({
          status: 'published',
          filters: { active: true },
          sort: ['sort_order:asc', 'publishedAt:desc'],
        });

      const active = entries
        .filter((item: any) => {
          const starts = item.starts_at ? Date.parse(item.starts_at) : null;
          const ends = item.ends_at ? Date.parse(item.ends_at) : null;

          if (starts && starts > now) return false;
          if (ends && ends < now) return false;
          return true;
        })
        .slice(0, 20)
        .map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          label: item.label || 'Update',
          headline: item.headline,
          link_url: item.link_url || '',
        }));

      ctx.body = { data: active };
    },
  }),
);
