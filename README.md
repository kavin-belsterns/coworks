# Coworks

Next.js 16 web app on Postgres 18. Built with the bls-aidlc pipeline. Agents read `AGENTS.md` first.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.4.3, App Router, `src/` layout |
| UI | React 19.3.1, Tailwind CSS 4.3.3 |
| Database | Postgres 18 (Docker), Prisma 7.10.1 with the `pg` adapter |
| Validation | zod 4 |
| Tests | Vitest 5, Playwright 1.64, axe, k6 |

## First run

1. Use Node 22.12 or newer.
2. Create `.env` in the repo root with these local values:

   ```bash
   DATABASE_URL=postgresql://app:app@localhost:5432/app_dev
   AUTH_SECRET=replace-with-a-long-random-string
   BASE_URL=http://localhost:3000
   ```

3. Run the setup commands:

   ```bash
   npm ci
   docker compose up -d db db-test
   npm run db:migrate
   npm run dev
   ```

4. Open http://localhost:3000. Check http://localhost:3000/api/v1/health returns `{"status":"ok","database":"up"}`.

## Checks

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
```

Integration tests need the `db-test` container on port 5433. See `AGENTS.md` for the full command list.

## Decisions

- Prisma 7 in place of the profile's Prisma 6: `aidlc/adr/0001-prisma-7.md`.
- Why each dependency exists: `aidlc/decisions.md`.
