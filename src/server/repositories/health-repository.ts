import { getDb } from '@/lib/db';

export async function pingDatabase(): Promise<boolean> {
  try {
    await getDb().$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
