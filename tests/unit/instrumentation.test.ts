// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';

const getEnv = vi.fn();
vi.mock('@/lib/env', () => ({ getEnv }));

const { register } = await import('@/instrumentation');

describe('SCAFFOLD instrumentation', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    getEnv.mockReset();
  });

  it('SCAFFOLD validates env on the Node.js runtime', async () => {
    vi.stubEnv('NEXT_RUNTIME', 'nodejs');
    await register();
    expect(getEnv).toHaveBeenCalledTimes(1);
  });

  it('SCAFFOLD skips validation on the edge runtime', async () => {
    vi.stubEnv('NEXT_RUNTIME', 'edge');
    await register();
    expect(getEnv).not.toHaveBeenCalled();
  });
});
