import { defineConfig } from 'drizzle-kit';

export default process.env.DB_LOCAL_PATH
  ? defineConfig({
      out: './src/migrations',
      schema: './src/database/schema.ts',
      dialect: 'sqlite',
      dbCredentials: {
        url: process.env.DB_LOCAL_PATH,
      },
    })
  : defineConfig({
      out: './src/migrations',
      schema: './src/database/schema.ts',
      dialect: 'sqlite',
      driver: 'd1-http',
      dbCredentials: {
        accountId: process.env.CF_ACCOUNT_ID!,
        token: process.env.CF_USER_API_TOKEN!,
        databaseId: process.env.DB_DATABASE_ID!,
      },
    });
