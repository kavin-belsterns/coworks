import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { getEnv } from './env';

// One client per process. Reused across hot reloads in dev.
const globalForDb = globalThis as unknown as { db?: PrismaClient };

export function getDb(): PrismaClient {
  if (!globalForDb.db) {
    const adapter = new PrismaPg({ connectionString: getEnv().DATABASE_URL });
    globalForDb.db = new PrismaClient({ adapter });
  }
  return globalForDb.db;
}
