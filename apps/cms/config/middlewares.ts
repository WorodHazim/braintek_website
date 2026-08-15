export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: { 'connect-src': ["'self'", 'http:', 'https:'], 'img-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'], 'media-src': ["'self'", 'data:', 'blob:', 'http:', 'https:'] }
      }
    }
  },
  {
    name: 'strapi::cors',
    config: { origin: [process.env.FRONTEND_URL || 'http://localhost:3000'], headers: ['Content-Type','Authorization','Origin','Accept'] }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
];
