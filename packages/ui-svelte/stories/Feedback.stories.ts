import type { Meta, StoryObj } from '@storybook/svelte';
import Alert from '../src/lib/Alert.svelte';
import AsyncState from '../src/lib/AsyncState.svelte';
import Progress from '../src/lib/Progress.svelte';
import Spinner from '../src/lib/Spinner.svelte';
import Toast from '../src/lib/Toast.svelte';

const meta = {
  title: 'Components/Feedback',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Informational: Story = {
  args: { tone: 'info', title: 'Route ready', message: 'Your route can be reviewed.' },
};

export const Danger: Story = {
  args: { tone: 'danger', title: 'Cannot save', message: 'Try again when connected.' },
};

export const RetryableFailure: Story = {
  render: () => ({ Component: AsyncState, props: { status: 'retryable-failure' } }),
};

export const Conflict: Story = {
  render: () => ({ Component: AsyncState, props: { status: 'conflict' } }),
};

export const ProgressState: Story = {
  render: () => ({
    Component: Progress,
    props: { label: 'Packing progress', value: 60, max: 100 },
  }),
};

export const Loading: Story = {
  render: () => ({ Component: Spinner, props: { label: 'Loading trip' } }),
};

export const ToastState: Story = {
  render: () => ({
    Component: Toast,
    props: { tone: 'success', title: 'Saved', message: 'Trip saved' },
  }),
};
