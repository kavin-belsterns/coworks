// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

const pingDatabase = vi.fn();
vi.mock('@/server/repositories/health-repository', () => ({ pingDatabase }));

const { getHealth } = await import('@/server/services/health-service');

describe('SCAFFOLD health service', () => {
  it('SCAFFOLD reports ok when the database is up', async () => {
    pingDatabase.mockResolvedValue(true);
    await expect(getHealth()).resolves.toEqual({ status: 'ok', database: 'up' });
  });

  it('SCAFFOLD reports degraded when the database is down', async () => {
    pingDatabase.mockResolvedValue(false);
    await expect(getHealth()).resolves.toEqual({ status: 'degraded', database: 'down' });
  });
});
