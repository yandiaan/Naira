import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('button story renders in the component workbench', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'storybook',
    'Storybook assertion belongs to the workbench project',
  );

  await page.goto('/iframe.html?id=primitives-button--primary&viewMode=story');
  await expect(page.getByRole('button', { name: 'Plan a trip' })).toBeVisible();
});

test('button story has no serious or critical accessibility violations', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'storybook',
    'Storybook a11y belongs to the workbench project',
  );

  await page.goto('/iframe.html?id=primitives-button--primary&viewMode=story');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(blocking).toEqual([]);
});
