import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'site',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4322' },
    },
    {
      name: 'workspace',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:5174' },
    },
    {
      name: 'storybook',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:6006' },
    },
  ],
  webServer: [
    {
      command: 'pnpm --dir apps/site dev --host 127.0.0.1 --port 4322',
      url: 'http://127.0.0.1:4322',
      env: {
        ASTRO_DEV_BACKGROUND: '0',
      },
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --dir apps/workspace dev --host 127.0.0.1 --port 5174',
      url: 'http://127.0.0.1:5174/app',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --dir packages/ui-svelte exec storybook dev -c .storybook --ci --port 6006',
      url: 'http://127.0.0.1:6006',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
