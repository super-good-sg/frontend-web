import { expect, test } from '@playwright/test';

test('app loads and the root route renders', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Super Good');
  await expect(page.locator('app-home h1')).toHaveText('Super Good');
});
