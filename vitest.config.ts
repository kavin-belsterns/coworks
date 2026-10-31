import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Sources: https://nextjs.org/docs/app/guides/testing/vitest
//          https://vitest.dev/config/coverage
// Playwright specs (*.spec.ts) are never matched here.
// Vite resolves tsconfig paths natively, so vite-tsconfig-paths is not needed.
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom', // integration tests add: // @vitest-environment node
    include: ['tests/unit/**/*.test.{ts,tsx}', 'tests/integration/**/*.test.ts', 'tests/evals/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      // Async Server Components cannot run in Vitest. Cover routes and pages in e2e.
      // src/generated is the Prisma client, built by `prisma generate`.
      exclude: ['src/app/**/page.tsx', 'src/app/**/layout.tsx', 'src/**/*.d.ts', 'src/generated/**'],
      thresholds: { lines: 80, functions: 80, branches: 70 },
    },
  },
});
