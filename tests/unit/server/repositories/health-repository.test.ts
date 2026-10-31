// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';

const queryRaw = vi.fn();
vi.mock('@/lib/db', () => ({ getDb: () => ({ $queryRaw: queryRaw }) }));

const { pingDatabase } = await import('@/server/repositories/health-repository');

describe('SCAFFOLD health repository', () => {
  beforeEach(() => {
    queryRaw.mockReset();
  });

  it('SCAFFOLD returns true when the database answers', async () => {
    queryRaw.mockResolvedValue([{ '?column?': 1 }]);
    await expect(pingDatabase()).resolves.toBe(true);
  });

  it('SCAFFOLD returns false when the query fails', async () => {
    queryRaw.mockRejectedValue(new Error('connection refused'));
    await expect(pingDatabase()).resolves.toBe(false);
  });
});
