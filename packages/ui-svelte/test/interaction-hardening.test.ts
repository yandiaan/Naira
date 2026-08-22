import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Button from '../src/lib/Button.svelte';
import Combobox from '../src/lib/Combobox.svelte';
import Dialog from '../src/lib/Dialog.svelte';
import DropdownMenu from '../src/lib/DropdownMenu.svelte';
import Drawer from '../src/lib/Drawer.svelte';
import Popover from '../src/lib/Popover.svelte';
import Pagination from '../src/lib/Pagination.svelte';
import Select from '../src/lib/Select.svelte';
import Tabs from '../src/lib/Tabs.svelte';
import Toast from '../src/lib/Toast.svelte';

it('exposes a loading state without changing the accessible label', () => {
  render(Button, { props: { label: 'Save', loading: true } });

  const button = screen.getByRole('button', { name: 'Save' });
  expect(button).toHaveAttribute('data-state', 'loading');
  expect(button).toHaveAttribute('aria-busy', 'true');
});

it('changes the selected tab when a tab is clicked', async () => {
  render(Tabs, {
    props: {
      selected: 'overview',
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'gear', label: 'Gear' },
      ],
    },
  });

  await fireEvent.click(screen.getByRole('tab', { name: 'Gear' }));

  expect(screen.getByRole('tab', { name: 'Gear' })).toHaveAttribute('aria-selected', 'true');
});

it('moves tab selection and focus with arrow keys', async () => {
  render(Tabs, {
    props: {
      selected: 'overview',
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'gear', label: 'Gear' },
      ],
    },
  });

  const overviewTab = screen.getByRole('tab', { name: 'Overview' });
  await fireEvent.keyDown(overviewTab, { key: 'ArrowRight' });

  const gearTab = screen.getByRole('tab', { name: 'Gear' });
  expect(gearTab).toHaveAttribute('aria-selected', 'true');
  expect(gearTab).toHaveFocus();
  expect(overviewTab).toHaveAttribute('tabindex', '-1');
});

it('selects a combobox option with keyboard input', async () => {
  render(Combobox, {
    props: {
      label: 'Destination',
      options: [
        { value: 'rinjani', label: 'Rinjani' },
        { value: 'papandayan', label: 'Papandayan' },
      ],
    },
  });

  const input = screen.getByRole('combobox', { name: 'Destination' });
  await fireEvent.keyDown(input, { key: 'ArrowDown' });
  await fireEvent.keyDown(input, { key: 'Enter' });

  expect(input).toHaveValue('Rinjani');
});

it('exposes combobox loading and validation semantics', () => {
  render(Combobox, {
    props: {
      label: 'Destination',
      loading: true,
      description: 'Search a supported trail',
      error: 'Choose a destination',
    },
  });

  const input = screen.getByRole('combobox', { name: 'Destination' });
  expect(input).toHaveAttribute('aria-busy', 'true');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAccessibleDescription('Search a supported trail Choose a destination');
});

it('exposes select validation semantics', () => {
  render(Select, {
    props: {
      label: 'Difficulty',
      options: [{ value: 'moderate', label: 'Moderate' }],
      error: 'Choose a difficulty',
      description: 'Used to prepare your gear list',
    },
  });

  const select = screen.getByRole('combobox', { name: 'Difficulty' });
  expect(select).toHaveAttribute('aria-invalid', 'true');
  expect(select).toHaveAccessibleDescription('Used to prepare your gear list Choose a difficulty');
});

it('exposes the dialog open state', () => {
  render(Dialog, { props: { open: true, title: 'Confirm trip' } });

  expect(screen.getByRole('dialog', { name: 'Confirm trip' })).toHaveAttribute(
    'data-state',
    'open',
  );
});

it('moves focus into a dialog and returns it to the trigger', async () => {
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.textContent = 'Open trip';
  document.body.append(trigger);
  trigger.focus();

  render(Dialog, { props: { open: true, title: 'Confirm trip' } });

  const closeButton = screen.getByRole('button', { name: 'Close' });
  await waitFor(() => expect(closeButton).toHaveFocus());
  await fireEvent.click(closeButton);
  await waitFor(() => expect(trigger).toHaveFocus());

  trigger.remove();
});

it('moves focus into a drawer and returns it to the trigger', async () => {
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.textContent = 'Open filters';
  document.body.append(trigger);
  trigger.focus();

  render(Drawer, { props: { open: true, title: 'Filters' } });

  const closeButton = screen.getByRole('button', { name: 'Close' });
  await waitFor(() => expect(closeButton).toHaveFocus());
  await fireEvent.click(closeButton);
  await waitFor(() => expect(trigger).toHaveFocus());

  trigger.remove();
});

it('supports keyboard navigation and Escape for a dropdown menu', async () => {
  render(DropdownMenu, {
    props: {
      items: [
        { id: 'edit', label: 'Edit trip' },
        { id: 'archive', label: 'Archive trip' },
      ],
    },
  });

  const trigger = screen.getByRole('button', { name: 'Open menu' });
  await fireEvent.keyDown(trigger, { key: 'ArrowDown' });

  const firstItem = screen.getByRole('menuitem', { name: 'Edit trip' });
  expect(firstItem).toHaveFocus();

  await fireEvent.keyDown(firstItem, { key: 'Escape' });
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

it('closes a popover with Escape', async () => {
  render(Popover, { props: { label: 'Trip details' } });

  const trigger = screen.getByRole('button', { name: 'Trip details' });
  await fireEvent.click(trigger);
  expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');

  await fireEvent.keyDown(trigger, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('changes pagination state and clamps navigation controls', async () => {
  render(Pagination, { props: { currentPage: 1, pageCount: 3 } });

  const nextButton = screen.getByRole('button', { name: 'Next page' });
  expect(nextButton).not.toBeDisabled();

  await fireEvent.click(nextButton);
  expect(screen.getByText('Page 2 of 3')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled();

  await fireEvent.click(nextButton);
  expect(screen.getByText('Page 3 of 3')).toBeVisible();
  expect(nextButton).toBeDisabled();
});

it('dismisses a toast through its action button', async () => {
  render(Toast, { props: { title: 'Trip saved', message: 'Your itinerary is ready.' } });

  await fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
