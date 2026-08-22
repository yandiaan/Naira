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

test('design-system overview story renders', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'storybook', 'Overview belongs to the workbench project');

  await page.goto('/iframe.html?id=overview-start-here--naira-system&viewMode=story');
  await expect(page.getByRole('heading', { name: /calm for discovery/i })).toBeVisible();
  await expect(page.getByText('Canopy palette')).toBeVisible();
});

test('catalog story renders an exported component', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'storybook', 'Catalog belongs to the workbench project');

  await page.goto('/iframe.html?id=catalog-all-exported-components--button&viewMode=story');
  await expect(page.getByRole('button', { name: 'Plan a trip' })).toBeVisible();
});

test('tabs story supports keyboard selection', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'storybook',
    'Interaction assertions belong to the workbench',
  );

  await page.goto('/iframe.html?id=interaction-production-states--tabs-keyboard&viewMode=story');
  const overviewTab = page.getByRole('tab', { name: 'Overview' });
  await overviewTab.focus();
  await overviewTab.press('ArrowRight');

  await expect(page.getByRole('tab', { name: 'Gear list' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('dialog story manages focus and Escape close', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'storybook',
    'Interaction assertions belong to the workbench',
  );

  await page.goto('/iframe.html?id=interaction-production-states--dialog-focus&viewMode=story');
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('validation story exposes invalid field semantics', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'storybook',
    'Interaction assertions belong to the workbench',
  );

  await page.goto(
    '/iframe.html?id=interaction-production-states--select-validation&viewMode=story',
  );
  const select = page.getByRole('combobox', { name: 'Difficulty' });
  await expect(select).toHaveAttribute('aria-invalid', 'true');
  await expect(select).toHaveAccessibleDescription(
    'Used to prepare your gear list Choose a difficulty',
  );
});

test('toast story dismisses through its action', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== 'storybook',
    'Interaction assertions belong to the workbench',
  );

  await page.goto(
    '/iframe.html?id=interaction-production-states--toast-dismissible&viewMode=story',
  );
  await page.getByRole('button', { name: 'Dismiss' }).click();
  await expect(page.getByRole('status')).not.toBeVisible();
});
