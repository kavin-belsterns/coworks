<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AI-DLC

Answer first: this repo uses AI-DLC. Read `aidlc/` before you code. Run the checks below before you say "done".

### Project

Coworks: a Next.js 16 web app on Postgres 18, built through the bls-aidlc pipeline.

### Run, test, lint

| Task | Command |
|---|---|
| Install | `npm ci` (runs `prisma generate`) |
| Start Postgres | `docker compose up -d db db-test` |
| Apply migrations | `npm run db:migrate` |
| Seed | `npm run db:seed` (Prisma 7 does not seed on migrate) |
| Run dev | `npm run dev` |
| Unit tests | `npm run test:unit` |
| One test file | `npx vitest run tests/unit/lib/env.test.ts` |
| Integration tests | `DATABASE_URL=postgresql://app:app@localhost:5433/app_test AUTH_SECRET=test BASE_URL=http://localhost:3000 npm run test:integration` |
| e2e tests | `npm run test:e2e` |
| Accessibility | `npm run test:a11y` |
| Load smoke | `npm run test:load` (needs k6) |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Build | `npm run build` |

### Stack pins

Exact versions, no carets. Change a major only through an ADR in `aidlc/adr/`.

| Package | Version |
|---|---|
| next, eslint-config-next | 16.4.3 |
| react, react-dom | 19.3.1 |
| prisma, @prisma/client, @prisma/adapter-pg | 7.10.1 (never `prisma@latest`: that tag is an RC) |
| Postgres image | `postgres:18-alpine` |
| typescript | 5.9.3 |

### Folder map

| Path | Holds |
|---|---|
| `src/app/` | Routes only. API under `src/app/api/v1/<resource>/route.ts` |
| `src/components/` | UI, one folder per feature |
| `src/server/services/` | Business logic. No HTTP, no Prisma imports |
| `src/server/repositories/` | The only code that calls Prisma |
| `src/server/schemas/` | zod schemas |
| `src/lib/` | `env.ts`, `db.ts`, shared helpers |
| `src/generated/prisma/` | Generated client. Gitignored. Never edit |
| `prisma/` | `schema.prisma`, `migrations/`, `seed.ts` |
| `tests/` | `unit`, `integration`, `e2e`, `a11y`, `load`, `evals` |
| `aidlc/` | AI-DLC state, see below |
| `.github/disabled/` | Parked CI and Dependabot. Off until deployment work. Local checks are the gate |

Layer rule: routes import services. Services import repositories. Repositories import `@/lib/db`. Components never import `src/server`.

### The aidlc/ folder

| Path | Holds | Who writes |
|---|---|---|
| `aidlc/adr/` | Architecture decisions | any skill, via ADR |
| `aidlc/decisions.md` | Why each dependency exists | whoever adds one |
| `aidlc/requirements/<id>/requirement.md` | FR and NFR in EARS form | aidlc-intake |
| `aidlc/requirements/<id>/design.md` | The one document a human signs | aidlc-design |
| `aidlc/requirements/<id>/specs/` | data, api, ui, tests | aidlc-spec |
| `aidlc/requirements/<id>/tasks.md` | Task waves | aidlc-spec |
| `aidlc/requirements/<id>/review/` | Gate records | aidlc-review |
| `aidlc/docs/` | Living docs | aidlc-docs |

### Which skill, when

| Situation | Skill |
|---|---|
| New repo or first use | aidlc-onboard |
| New SOW, BRD or issue | aidlc-intake |
| Requirement passed G1 | aidlc-design |
| Design signed | aidlc-spec |
| Specs passed G3 | aidlc-build |
| Code written | aidlc-test |
| Any gate | aidlc-review |
| Feature done | aidlc-docs |
| Ready to commit | aidlc-commit |

### Done means

1. The command ran. Its output is pasted in the reply.
2. Tests pass. "All tests pass" with no output does not count.
3. Each change cites a requirement id (FR-001). Test titles start with it.

### Commit rule

- Conventional Commits: `type(scope): description`.
- One small change per commit. Tests land with the code.
- Trailers: `Refs: FR-001`, and `Closes #N` when an issue exists.
- A git `commit-msg` hook checks this. Never use `--no-verify`.
- Use the aidlc-commit skill.

### Never

- Never move or rename existing files without a requirement that says so.
- Never change an id in `requirement.md` after G1.
- Never commit secrets, `.env` files or real customer data.
- Never log env values.
- Never skip a failing test. Fix it or stop and ask.
- Never add a dependency without writing why in `aidlc/decisions.md`.
- Never claim "done" without command output.
- Never push to the default branch directly.
