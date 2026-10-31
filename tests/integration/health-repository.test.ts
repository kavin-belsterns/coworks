// @vitest-environment node
// Needs a real Postgres: docker compose up -d db-test, then
// DATABASE_URL=postgresql://app:app@localhost:5433/app_test AUTH_SECRET=test BASE_URL=http://localhost:3000 npm run test:integration
import { afterAll, describe, expect, it } from 'vitest';
import { getDb } from '@/lib/db';
import { pingDatabase } from '@/server/repositories/health-repository';

describe('SCAFFOLD health repository against Postgres', () => {
  afterAll(async () => {
    await getDb().$disconnect();
  });

  it('SCAFFOLD reaches the database', async () => {
    await expect(pingDatabase()).resolves.toBe(true);
  });
});
