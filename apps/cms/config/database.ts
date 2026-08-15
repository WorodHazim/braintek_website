export default ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'postgres'),
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'braintek'),
      user: env('DATABASE_USERNAME', 'braintek'),
      password: env('DATABASE_PASSWORD', 'braintek_dev_password'),
      ssl: env.bool('DATABASE_SSL', false) ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) } : false,
      schema: env('DATABASE_SCHEMA', 'public')
    },
    pool: { min: 2, max: 10 }
  }
});
