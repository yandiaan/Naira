import type { Meta, StoryObj } from '@storybook/svelte';
import SyncStatus from '../src/lib/SyncStatus.svelte';

const meta = {
  title: 'Primitives/SyncStatus',
  component: SyncStatus,
  tags: ['autodocs'],
} satisfies Meta<SyncStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Conflict: Story = {
  args: {
    status: 'conflict',
  },
};
