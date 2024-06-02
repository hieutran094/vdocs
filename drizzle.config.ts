import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/migrations',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
});
