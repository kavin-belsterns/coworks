# ADR 0001: Use Prisma 7.10.1 in place of the profile's Prisma 6

Status: accepted
Decision: Pin `prisma`, `@prisma/client` and `@prisma/adapter-pg` to exactly 7.10.1.

## Context

The bls-aidlc Next.js profile pins Prisma 6. It says a move to 7 needs an ADR.
The project brief asks for the latest stable version of every tool.
On 2026-10-31 the npm `latest` tag for `prisma` points to `8.0.0-rc.29`, a release candidate. The newest stable line is 7.

## Options

| Option | Pros | Cons |
|--------|------|------|
| A. Prisma 6.19.3 (profile pin) | Matches the profile docs | Not the latest stable. Older engine model |
| B. Prisma 7.10.1 | Latest stable. No Rust query engine. Pure TS client | Config and seed flow differ from the profile |
| C. Prisma 8 RC | Newest | Not stable. Rejected by the brief |

## Decision

Option B. It is the newest stable release and meets the brief.
The 7.x changes are small for a greenfield repo with no models yet.

## Consequences

- Good: the client is generated into `src/generated/prisma` and runs on the `pg` driver adapter.
- Good: the connection string lives in `prisma.config.ts`, not in `schema.prisma`.
- Bad: `prisma migrate dev` no longer runs the seed. Run `npm run db:seed` after migrating.
- Bad: never install with `prisma@latest` while that tag points at an RC. Pin the exact version.
- Follow-up: re-check before moving to 8.x. Write a new ADR then.

## Sources

1. npm registry dist-tags for `prisma` and `@prisma/client`, read 2026-10-31.
2. Installed types: `node_modules/@prisma/config/dist/index.d.ts` (datasource, migrations.seed).
3. Installed README: `node_modules/@prisma/adapter-pg/README.md`.
4. Prisma v7 seeding page, as cited in the bls-aidlc Next.js profile: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
