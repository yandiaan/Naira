import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import AsyncBoundary from '../src/lib/patterns/AsyncBoundary.svelte';
import ListDetail from '../src/lib/patterns/ListDetail.svelte';
import ResponsiveActionBar from '../src/lib/patterns/ResponsiveActionBar.svelte';

it('renders a list-detail composition with a selected item', () => {
  render(ListDetail, { props: { selectedId: 'trip-1', mobileMode: 'stacked' } });

  expect(screen.getByTestId('list-detail-detail')).toBeVisible();
});

it('keeps the primary action reachable in the responsive action bar', () => {
  render(ResponsiveActionBar, { props: { primaryLabel: 'Simpan' } });

  expect(screen.getByRole('button', { name: 'Simpan' })).toBeVisible();
});

it('renders a retry action for a retryable boundary state', () => {
  render(AsyncBoundary, { props: { status: 'retryable-failure' } });

  expect(screen.getByRole('button', { name: /retry/i })).toBeVisible();
});
