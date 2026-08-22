import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Dialog from '../src/lib/Dialog.svelte';
import Drawer from '../src/lib/Drawer.svelte';
import Tabs from '../src/lib/Tabs.svelte';

it('renders an open dialog with an accessible name', () => {
  render(Dialog, { props: { open: true, title: 'Confirm trip' } });

  expect(screen.getByRole('dialog', { name: 'Confirm trip' })).toBeVisible();
});

it('renders a labelled drawer as a dialog surface', () => {
  render(Drawer, { props: { open: true, title: 'Filters' } });

  expect(screen.getByRole('dialog', { name: 'Filters' })).toBeVisible();
});

it('exposes the selected tab', () => {
  render(Tabs, {
    props: { selected: 'overview', tabs: [{ id: 'overview', label: 'Overview' }] },
  });

  expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
});
