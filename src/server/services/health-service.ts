import { pingDatabase } from '@/server/repositories/health-repository';

export type Health = {
  status: 'ok' | 'degraded';
  database: 'up' | 'down';
};

export async function getHealth(): Promise<Health> {
  const databaseUp = await pingDatabase();
  return {
    status: databaseUp ? 'ok' : 'degraded',
    database: databaseUp ? 'up' : 'down',
  };
}
