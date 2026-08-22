import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import List from '../src/lib/List.svelte';
import Table from '../src/lib/Table.svelte';

it('renders a table caption and column headers', () => {
  render(Table, {
    props: {
      caption: 'Gear list',
      columns: [{ key: 'name', label: 'Name' }],
      rows: [{ name: 'Water' }],
    },
  });

  expect(screen.getByRole('table', { name: 'Gear list' })).toBeVisible();
  expect(screen.getByRole('columnheader', { name: 'Name' })).toBeVisible();
});

it('renders a useful empty state for an empty list', () => {
  render(List, { props: { label: 'Trips', items: [] } });

  expect(screen.getByText(/no trips/i)).toBeVisible();
});
