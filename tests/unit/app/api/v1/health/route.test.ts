// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

const getHealth = vi.fn();
vi.mock('next/server', () => ({ connection: vi.fn().mockResolvedValue(undefined) }));
vi.mock('@/server/services/health-service', () => ({ getHealth }));

const { GET } = await import('@/app/api/v1/health/route');

describe('SCAFFOLD GET /api/v1/health', () => {
  it('SCAFFOLD returns 200 when healthy', async () => {
    getHealth.mockResolvedValue({ status: 'ok', database: 'up' });
    const response = await GET();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: 'ok', database: 'up' });
  });

  it('SCAFFOLD returns 503 when degraded', async () => {
    getHealth.mockResolvedValue({ status: 'degraded', database: 'down' });
    const response = await GET();
    expect(response.status).toBe(503);
  });
});
