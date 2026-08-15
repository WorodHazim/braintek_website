export default ({ env }) => ({
  'users-permissions': { config: { jwt: { expiresIn: '7d' } } },
  'braintek-ops': { enabled: true, resolve: './src/plugins/braintek-ops' },
  email: {
    config: env('SMTP_HOST') ? {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT', 587),
        secure: env.bool('SMTP_SECURE', false),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD')
        }
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'BRAINTEK <no-reply@braintek.ae>'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'info@braintek.ae')
      }
    } : {
      provider: 'sendmail',
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', 'BRAINTEK <no-reply@braintek.ae>'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'info@braintek.ae')
      }
    }
  },
  ...(env('S3_BUCKET') ? {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          baseUrl: env('CDN_URL'),
          s3Options: {
            credentials: {
              accessKeyId: env('S3_ACCESS_KEY_ID'),
              secretAccessKey: env('S3_ACCESS_SECRET')
            },
            region: env('S3_REGION', 'auto'),
            ...(env('S3_ENDPOINT') ? { endpoint: env('S3_ENDPOINT') } : {}),
            params: {
              Bucket: env('S3_BUCKET')
            }
          }
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {}
        }
      }
    }
  } : {})
});
