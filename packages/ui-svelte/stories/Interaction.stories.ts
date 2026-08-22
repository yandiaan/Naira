import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../src/lib/Button.svelte';
import Combobox from '../src/lib/Combobox.svelte';
import Dialog from '../src/lib/Dialog.svelte';
import Drawer from '../src/lib/Drawer.svelte';
import DropdownMenu from '../src/lib/DropdownMenu.svelte';
import Pagination from '../src/lib/Pagination.svelte';
import Popover from '../src/lib/Popover.svelte';
import Select from '../src/lib/Select.svelte';
import Tabs from '../src/lib/Tabs.svelte';
import TextInput from '../src/lib/TextInput.svelte';
import Toast from '../src/lib/Toast.svelte';

const meta = {
  title: 'Interaction/Production states',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonLoading: Story = {
  render: () => ({ Component: Button, props: { label: 'Saving itinerary', loading: true } }),
};

export const ButtonDisabled: Story = {
  render: () => ({ Component: Button, props: { label: 'Continue', disabled: true } }),
};

export const ComboboxLoading: Story = {
  render: () => ({
    Component: Combobox,
    props: {
      label: 'Destination',
      loading: true,
      description: 'Search a supported trail',
    },
  }),
};

export const ComboboxValidation: Story = {
  render: () => ({
    Component: Combobox,
    props: {
      label: 'Destination',
      error: 'Choose a destination',
      options: [{ value: 'rinjani', label: 'Rinjani' }],
    },
  }),
};

export const DialogFocus: Story = {
  render: () => ({
    Component: Dialog,
    props: {
      open: true,
      title: 'Confirm itinerary',
      description: 'Review the plan before sharing it with your group.',
    },
  }),
};

export const DrawerFocus: Story = {
  render: () => ({
    Component: Drawer,
    props: { open: true, title: 'Trip filters', description: 'Narrow the trails you want to see.' },
  }),
};

export const DropdownKeyboard: Story = {
  render: () => ({
    Component: DropdownMenu,
    props: {
      label: 'Trip actions',
      items: [
        { id: 'edit', label: 'Edit itinerary' },
        { id: 'share', label: 'Share with group' },
        { id: 'archive', label: 'Archive trip', disabled: true },
      ],
    },
  }),
};

export const PaginationMiddle: Story = {
  render: () => ({ Component: Pagination, props: { currentPage: 2, pageCount: 5 } }),
};

export const PopoverOpen: Story = {
  render: () => ({ Component: Popover, props: { open: true, label: 'Trip details' } }),
};

export const SelectValidation: Story = {
  render: () => ({
    Component: Select,
    props: {
      label: 'Difficulty',
      description: 'Used to prepare your gear list',
      error: 'Choose a difficulty',
      options: [{ value: 'moderate', label: 'Moderate' }],
    },
  }),
};

export const TabsKeyboard: Story = {
  render: () => ({
    Component: Tabs,
    props: {
      selected: 'overview',
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'gear', label: 'Gear list' },
        { id: 'logistics', label: 'Logistics', disabled: true },
      ],
    },
  }),
};

export const TextInputValidation: Story = {
  render: () => ({
    Component: TextInput,
    props: {
      label: 'Trip name',
      value: 'Rinjani sunrise',
      description: 'Keep it clear for your group',
      error: 'This name is already used',
    },
  }),
};

export const ToastDismissible: Story = {
  render: () => ({
    Component: Toast,
    props: { tone: 'success', title: 'Trip saved', message: 'Your itinerary is ready to share.' },
  }),
};
