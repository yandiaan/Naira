import type { Meta, StoryObj } from '@storybook/svelte';
import EmptyState from '../src/lib/EmptyState.svelte';

const meta = {
  title: 'Primitives/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'This state is ready for a feature to provide its content.',
  },
};
