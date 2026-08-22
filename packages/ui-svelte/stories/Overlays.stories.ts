import type { Meta, StoryObj } from '@storybook/svelte';
import Dialog from '../src/lib/Dialog.svelte';
import Drawer from '../src/lib/Drawer.svelte';
import DropdownMenu from '../src/lib/DropdownMenu.svelte';
import Tabs from '../src/lib/Tabs.svelte';

const meta = {
  title: 'Components/Overlays and Navigation',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDialog: Story = {
  args: { open: true, title: 'Confirm trip', description: 'Review before continuing.' },
};

export const OpenDrawer: Story = {
  render: () => ({ Component: Drawer, props: { open: true, title: 'Filters' } }),
};

export const Menu: Story = {
  render: () => ({
    Component: DropdownMenu,
    props: { open: true, label: 'Actions', items: [{ id: 'edit', label: 'Edit trip' }] },
  }),
};

export const SelectedTab: Story = {
  render: () => ({
    Component: Tabs,
    props: {
      selected: 'overview',
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'gear', label: 'Gear' },
      ],
    },
  }),
};
