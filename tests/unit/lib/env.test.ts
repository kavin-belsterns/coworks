// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getEnv, parseEnv } from '@/lib/env';

const valid = {
  DATABASE_URL: 'postgresql://app:app@localhost:5432/app_dev',
  AUTH_SECRET: 'secret',
  BASE_URL: 'http://localhost:3000',
};

describe('SCAFFOLD env', () => {
  it('SCAFFOLD parses a valid environment', () => {
    expect(parseEnv(valid)).toEqual(valid);
  });

  it('SCAFFOLD rejects a missing key and names it without its value', () => {
    expect(() => parseEnv({ ...valid, AUTH_SECRET: undefined })).toThrow(
      'Invalid environment variables: AUTH_SECRET',
    );
  });

  it('SCAFFOLD rejects a non-Postgres database url', () => {
    expect(() => parseEnv({ ...valid, DATABASE_URL: 'mysql://localhost/app' })).toThrow(
      'DATABASE_URL',
    );
  });
});

describe('SCAFFOLD getEnv', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('SCAFFOLD reads process.env once and caches the result', () => {
    for (const [key, value] of Object.entries(valid)) vi.stubEnv(key, value);
    const first = getEnv();
    vi.stubEnv('BASE_URL', 'http://changed.test');
    expect(getEnv()).toBe(first);
    expect(first.BASE_URL).toBe('http://localhost:3000');
  });
});
