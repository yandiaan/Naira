import type { Meta, StoryObj } from '@storybook/svelte';
import * as components from '../src/index';

const meta = {
  title: 'Catalog/All exported components',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accordion: Story = {
  render: () => ({
    Component: components.Accordion,
    props: { items: [{ id: 'one', title: 'What is Naira?', content: 'A planning workspace.' }] },
  }),
};
export const Alert: Story = {
  render: () => ({
    Component: components.Alert,
    props: { tone: 'info', title: 'Route ready', message: 'Review before continuing.' },
  }),
};
export const AsyncBoundary: Story = {
  render: () => ({ Component: components.AsyncBoundary, props: { status: 'retryable-failure' } }),
};
export const AsyncState: Story = {
  render: () => ({ Component: components.AsyncState, props: { status: 'conflict' } }),
};
export const Badge: Story = {
  render: () => ({ Component: components.Badge, props: { label: 'Ready', tone: 'success' } }),
};
export const Banner: Story = {
  render: () => ({
    Component: components.Banner,
    props: { tone: 'warning', title: 'Offline', message: 'Changes will sync later.' },
  }),
};
export const Breadcrumb: Story = {
  render: () => ({
    Component: components.Breadcrumb,
    props: { items: [{ label: 'Trips', href: '/trips' }, { label: 'Rinjani' }] },
  }),
};
export const Button: Story = {
  render: () => ({
    Component: components.Button,
    props: { label: 'Plan a trip', variant: 'primary' },
  }),
};
export const Card: Story = {
  render: () => ({ Component: components.Card, props: { tone: 'elevated', ariaLabel: 'Card' } }),
};
export const Checkbox: Story = {
  render: () => ({ Component: components.Checkbox, props: { label: 'Bring water' } }),
};
export const Combobox: Story = {
  render: () => ({
    Component: components.Combobox,
    props: { label: 'Destination', options: [{ value: 'rinjani', label: 'Rinjani' }] },
  }),
};
export const Dialog: Story = {
  render: () => ({ Component: components.Dialog, props: { open: true, title: 'Confirm trip' } }),
};
export const Divider: Story = {
  render: () => ({ Component: components.Divider, props: { orientation: 'horizontal' } }),
};
export const Drawer: Story = {
  render: () => ({ Component: components.Drawer, props: { open: true, title: 'Filters' } }),
};
export const DropdownMenu: Story = {
  render: () => ({
    Component: components.DropdownMenu,
    props: { open: true, label: 'Actions', items: [{ id: 'edit', label: 'Edit trip' }] },
  }),
};
export const EmptyState: Story = {
  render: () => ({
    Component: components.EmptyState,
    props: { title: 'Nothing here yet', description: 'Start with your first trip.' },
  }),
};
export const ErrorState: Story = {
  render: () => ({
    Component: components.ErrorState,
    props: { title: 'Cannot load', message: 'Try again.' },
  }),
};
export const Field: Story = {
  render: () => ({
    Component: components.Field,
    props: { id: 'name', label: 'Trip name', required: true, error: 'Required' },
  }),
};
export const FilterBar: Story = {
  render: () => ({ Component: components.FilterBar, props: { filterCount: 2 } }),
};
export const FormLayout: Story = {
  render: () => ({ Component: components.FormLayout, props: { density: 'comfortable' } }),
};
export const Heading: Story = {
  render: () => ({ Component: components.Heading, props: { level: 2, size: 'lg' } }),
};
export const Icon: Story = {
  render: () => ({ Component: components.Icon, props: { name: 'Compass', label: 'Compass' } }),
};
export const IconButton: Story = {
  render: () => ({ Component: components.IconButton, props: { name: 'Menu', label: 'Open menu' } }),
};
export const Inline: Story = {
  render: () => ({ Component: components.Inline, props: { gap: 'sm' } }),
};
export const Link: Story = {
  render: () => ({ Component: components.Link, props: { href: '/app', label: 'Open planner' } }),
};
export const List: Story = {
  render: () => ({
    Component: components.List,
    props: { label: 'Trips', items: [{ id: 'trip-1', label: 'Rinjani' }] },
  }),
};
export const ListDetail: Story = {
  render: () => ({
    Component: components.ListDetail,
    props: { selectedId: 'trip-1', mobileMode: 'stacked' },
  }),
};
export const Metric: Story = {
  render: () => ({
    Component: components.Metric,
    props: { label: 'Packing progress', value: '72%', trend: '+8%' },
  }),
};
export const NumberInput: Story = {
  render: () => ({ Component: components.NumberInput, props: { label: 'Members', value: '4' } }),
};
export const OfflineBanner: Story = {
  render: () => ({ Component: components.OfflineBanner, props: { online: false } }),
};
export const PageHeader: Story = {
  render: () => ({
    Component: components.PageHeader,
    props: { title: 'Planner', description: 'Prepare the details.' },
  }),
};
export const Pagination: Story = {
  render: () => ({ Component: components.Pagination, props: { currentPage: 2, pageCount: 5 } }),
};
export const Popover: Story = {
  render: () => ({ Component: components.Popover, props: { open: true, label: 'Details' } }),
};
export const Progress: Story = {
  render: () => ({
    Component: components.Progress,
    props: { label: 'Packing progress', value: 72, max: 100 },
  }),
};
export const Radio: Story = {
  render: () => ({
    Component: components.Radio,
    props: { name: 'difficulty', label: 'Moderate', value: 'moderate' },
  }),
};
export const ResponsiveActionBar: Story = {
  render: () => ({
    Component: components.ResponsiveActionBar,
    props: { primaryLabel: 'Save', secondaryLabel: 'Cancel' },
  }),
};
export const SearchFilterPanel: Story = {
  render: () => ({
    Component: components.SearchFilterPanel,
    props: { resultSummary: '12 trips', filterCount: 2 },
  }),
};
export const SearchInput: Story = {
  render: () => ({
    Component: components.SearchInput,
    props: { label: 'Search trips', query: 'Rinjani' },
  }),
};
export const Select: Story = {
  render: () => ({
    Component: components.Select,
    props: {
      label: 'Difficulty',
      value: 'moderate',
      options: [{ value: 'moderate', label: 'Moderate' }],
    },
  }),
};
export const Skeleton: Story = {
  render: () => ({
    Component: components.Skeleton,
    props: { shape: 'rect', width: 'full', height: 'lg' },
  }),
};
export const Spinner: Story = {
  render: () => ({ Component: components.Spinner, props: { label: 'Loading trip' } }),
};
export const Stack: Story = {
  render: () => ({ Component: components.Stack, props: { gap: 'md' } }),
};
export const Stepper: Story = {
  render: () => ({
    Component: components.Stepper,
    props: { steps: [{ id: '1', label: 'Plan', status: 'current' }] },
  }),
};
export const Surface: Story = {
  render: () => ({
    Component: components.Surface,
    props: { tone: 'elevated', ariaLabel: 'Surface' },
  }),
};
export const Switch: Story = {
  render: () => ({ Component: components.Switch, props: { label: 'Offline mode' } }),
};
export const SyncStatus: Story = {
  render: () => ({ Component: components.SyncStatus, props: { status: 'conflict' } }),
};
export const Table: Story = {
  render: () => ({
    Component: components.Table,
    props: {
      caption: 'Trips',
      columns: [{ key: 'name', label: 'Name' }],
      rows: [{ name: 'Rinjani' }],
    },
  }),
};
export const Tabs: Story = {
  render: () => ({
    Component: components.Tabs,
    props: { selected: 'overview', tabs: [{ id: 'overview', label: 'Overview' }] },
  }),
};
export const Text: Story = {
  render: () => ({ Component: components.Text, props: { as: 'p', size: 'md' } }),
};
export const TextInput: Story = {
  render: () => ({
    Component: components.TextInput,
    props: { label: 'Trip name', value: 'Rinjani' },
  }),
};
export const Textarea: Story = {
  render: () => ({
    Component: components.Textarea,
    props: { label: 'Notes', description: 'Add context.' },
  }),
};
export const Timeline: Story = {
  render: () => ({
    Component: components.Timeline,
    props: { items: [{ id: 'start', time: '06:00', title: 'Start from basecamp' }] },
  }),
};
export const Toast: Story = {
  render: () => ({
    Component: components.Toast,
    props: { tone: 'success', title: 'Saved', message: 'Trip saved.' },
  }),
};
export const Tooltip: Story = {
  render: () => ({ Component: components.Tooltip, props: { label: 'More information' } }),
};
export const VisuallyHidden: Story = {
  render: () => ({ Component: components.VisuallyHidden, props: { as: 'span' } }),
};
