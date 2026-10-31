import { connection } from 'next/server';
import { getHealth } from '@/server/services/health-service';

export async function GET() {
  // Cache Components is on. Defer to request time so the build never queries the database.
  await connection();
  const health = await getHealth();
  return Response.json(health, { status: health.status === 'ok' ? 200 : 503 });
}
