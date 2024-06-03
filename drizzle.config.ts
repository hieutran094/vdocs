import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/migrations',
  schema: './src/database/schema.ts',
  dialect: 'sqlite',
});
