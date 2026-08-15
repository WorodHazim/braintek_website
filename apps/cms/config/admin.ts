export default ({ env }) => ({
  auth: { secret: env('ADMIN_JWT_SECRET') },
  apiToken: { salt: env('API_TOKEN_SALT') },
  transfer: { token: { salt: env('TRANSFER_TOKEN_SALT') } },
  secrets: { encryptionKey: env('ENCRYPTION_KEY', env('ADMIN_JWT_SECRET')) },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('FRONTEND_URL', 'http://localhost:3000')],
      async handler(uid, { documentId, locale, status }) {
        const frontend = env('FRONTEND_URL', 'http://localhost:3000');
        return `${frontend}/api/preview?secret=${encodeURIComponent(env('PREVIEW_SECRET'))}&uid=${encodeURIComponent(uid)}&documentId=${encodeURIComponent(documentId)}&locale=${locale || 'en'}&status=${status || 'draft'}`;
      }
    }
  }
});
