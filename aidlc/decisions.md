# Dependency decisions

Every dependency and why it is here. Versions are exact pins, read from npm on 2026-10-31.

## Runtime

| Package | Version | Why |
|---|---|---|
| next | 16.4.3 | App framework, App Router |
| react, react-dom | 19.3.1 | Required by Next.js |
| @prisma/client | 7.10.1 | Database client. See ADR 0001 |
| @prisma/adapter-pg | 7.10.1 | Prisma 7 driver adapter for Postgres |
| pg | 8.23.1 | Postgres driver used by the adapter |
| zod | 4.6.7 | Env and input validation |

## Development

| Package | Version | Why |
|---|---|---|
| prisma | 7.10.1 | CLI: generate, migrate, seed |
| typescript | 5.9.3 | Type checking. TS 7 not adopted yet: Next.js tooling uses the TS 5 API |
| eslint, eslint-config-next | 10.14.0, 16.4.3 | Lint |
| tailwindcss, @tailwindcss/turbopack | 4.3.3 | Styling, from create-next-app |
| tsx | 4.23.15 | Runs `prisma/seed.ts` |
| dotenv | 18.0.9 | Loads `.env` for Prisma CLI and seed |
| vitest, @vitest/coverage-v8 | 5.0.5 | Unit and integration tests, coverage |
| @vitejs/plugin-react | 6.1.2 | JSX in Vitest |
| jsdom | 30.1.3 | DOM for component tests |
| @testing-library/react, @testing-library/dom | 16.3.3, 10.4.2 | Component tests |
| @playwright/test | 1.64.1 | e2e and UI tests |
| @axe-core/playwright | 4.14.0 | Accessibility checks |
| @types/node, @types/react, @types/react-dom, @types/pg | 22.x, 19.3.0, 19.3.0, 8.23.1 | Types |

## Known audit findings

`npm audit` reports 15 moderate findings. All trace to one `minimatch` DoS advisory inside dev-only lint packages.
npm's suggested fix downgrades to eslint 4, so it is not applied. Re-check when eslint-config-next updates.
