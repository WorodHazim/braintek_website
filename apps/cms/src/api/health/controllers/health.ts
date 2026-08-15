export default {
  async index(ctx) {
    ctx.set('Cache-Control','no-store');
    ctx.body = { ok: true, service: 'braintek-cms', timestamp: new Date().toISOString() };
  }
};
