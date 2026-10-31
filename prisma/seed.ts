import { config } from 'dotenv';
import { getDb } from '../src/lib/db';

// Prisma 7: `migrate dev` does not run this. Run `npm run db:seed` yourself.
config({ quiet: true });

async function main() {
  const db = getDb();
  try {
    // No models yet. Add seed data here once specs/01-data.md defines them.
    await db.$queryRaw`SELECT 1`;
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
