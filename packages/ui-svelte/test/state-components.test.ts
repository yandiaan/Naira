import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import OfflineBanner from '../src/lib/OfflineBanner.svelte';
import SyncStatus from '../src/lib/SyncStatus.svelte';
import TextInput from '../src/lib/TextInput.svelte';

it('exposes input errors accessibly', () => {
  render(TextInput, { props: { label: 'Name', error: 'Name is required' } });

  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Name is required');
});

it('shows the offline status', () => {
  render(OfflineBanner, { props: { online: false } });

  expect(screen.getByRole('status')).toHaveTextContent('Offline');
});

it('shows sync conflict status', () => {
  render(SyncStatus, { props: { status: 'conflict' } });

  expect(screen.getByRole('status')).toHaveTextContent('Conflict');
});

it('links input description and error to the control', () => {
  render(TextInput, {
    props: {
      label: 'Name',
      description: 'Use your trail name',
      error: 'Name is required',
    },
  });

  expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
    'Use your trail name Name is required',
  );
});

it('shows a custom offline message', () => {
  render(OfflineBanner, { props: { online: false, message: 'Draft saved on this device' } });

  expect(screen.getByRole('status')).toHaveTextContent('Draft saved on this device');
});

it('shows a retryable sync state', () => {
  render(SyncStatus, { props: { status: 'retryable-failure' } });

  expect(screen.getByRole('status')).toHaveTextContent(/retry/i);
});
