import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('public pilot has no serious or critical accessibility violations', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'site', 'Public a11y belongs to the site project');

  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(blocking).toEqual([]);
});

test('workspace pilot has no serious or critical accessibility violations', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'workspace',
    'Workspace a11y belongs to the workspace project',
  );

  await page.goto('/app');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(blocking).toEqual([]);
});

test('admin pilot has no serious or critical accessibility violations', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'workspace', 'Admin a11y belongs to the workspace project');

  await page.goto('/admin');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  expect(blocking).toEqual([]);
});
