import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

async function waitForFonts(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test('public pilot mobile visual baseline', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'site', 'Public visual belongs to the site project');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await waitForFonts(page);
  await expect(page).toHaveScreenshot('public-pilot-site-mobile.png', {
    fullPage: true,
    animations: 'disabled',
  });
});

test('planner pilot mobile visual baseline', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'workspace',
    'Planner visual belongs to the workspace project',
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/app');
  await waitForFonts(page);
  await expect(page).toHaveScreenshot('planner-workspace-mobile.png', {
    fullPage: true,
    animations: 'disabled',
  });
});
