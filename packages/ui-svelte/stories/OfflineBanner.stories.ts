import type { Meta, StoryObj } from '@storybook/svelte';
import OfflineBanner from '../src/lib/OfflineBanner.svelte';

const meta = {
  title: 'Primitives/OfflineBanner',
  component: OfflineBanner,
  tags: ['autodocs'],
} satisfies Meta<OfflineBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Offline: Story = {
  args: {
    online: false,
  },
};
