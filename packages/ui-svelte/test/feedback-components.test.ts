import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Alert from '../src/lib/Alert.svelte';
import AsyncState from '../src/lib/AsyncState.svelte';
import Progress from '../src/lib/Progress.svelte';

it('announces a danger alert with its semantic role', () => {
  render(Alert, { props: { tone: 'danger', title: 'Cannot save', message: 'Try again' } });

  expect(screen.getByRole('alert')).toHaveTextContent('Cannot save');
});

it('exposes a labelled progress value', () => {
  render(Progress, { props: { value: 50, max: 100, label: 'Packing progress' } });

  expect(screen.getByRole('progressbar', { name: 'Packing progress' })).toHaveAttribute(
    'aria-valuenow',
    '50',
  );
});

it('renders a retry action for a retryable failure', () => {
  render(AsyncState, { props: { status: 'retryable-failure' } });

  expect(screen.getByRole('button', { name: /retry/i })).toBeVisible();
});
