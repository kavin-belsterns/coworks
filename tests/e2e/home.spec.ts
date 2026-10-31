import { expect, test } from '@playwright/test';

test('SCAFFOLD home page renders @journey', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Coworks' })).toBeVisible();
});

test('SCAFFOLD health endpoint reports the database up @journey', async ({ request }) => {
  const response = await request.get('/api/v1/health');
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ status: 'ok', database: 'up' });
});
