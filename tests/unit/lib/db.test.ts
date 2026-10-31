// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

vi.mock('@prisma/adapter-pg', () => ({ PrismaPg: vi.fn() }));
vi.mock('@/generated/prisma/client', () => ({ PrismaClient: vi.fn() }));
vi.mock('@/lib/env', () => ({
  getEnv: () => ({ DATABASE_URL: 'postgresql://app:app@localhost:5432/app_dev' }),
}));

describe('SCAFFOLD db', () => {
  it('SCAFFOLD builds one client with the pg adapter and reuses it', async () => {
    const { PrismaPg } = await import('@prisma/adapter-pg');
    const { PrismaClient } = await import('@/generated/prisma/client');
    const { getDb } = await import('@/lib/db');

    expect(getDb()).toBe(getDb());
    expect(PrismaPg).toHaveBeenCalledTimes(1);
    expect(PrismaPg).toHaveBeenCalledWith({
      connectionString: 'postgresql://app:app@localhost:5432/app_dev',
    });
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });
});
