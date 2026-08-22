import { expect, test } from '@playwright/test';

test('public site renders its foundation shell', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'site', 'Site assertion belongs to the site project');

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Naira' })).toBeVisible();
  await expect(page.getByText('Rencanakan perjalanan outdoor')).toBeVisible();
});

test('workspace exposes app and admin shells', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'workspace',
    'Workspace assertion belongs to the workspace project',
  );

  await page.goto('/app');
  await expect(page.getByRole('heading', { name: 'Planner workspace' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('navigation', { name: 'Planner mobile navigation' })).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.getByRole('navigation', { name: 'Planner navigation' })).toBeVisible();

  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: 'Administration shell' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole('navigation', { name: 'Administration mobile navigation' }),
  ).toBeVisible();
});
