import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Prisma 7 reads the connection string here, not in schema.prisma. See aidlc/adr/0001-prisma-7.md.
// process.env (not env()) so `prisma generate` works in CI without DATABASE_URL.
config({ quiet: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
