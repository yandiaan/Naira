import type { Preview } from '@storybook/svelte';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#FAF8F1' },
        { name: 'night', value: '#121A16' },
      ],
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
    a11y: {
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/iu,
        date: /Date$/u,
      },
    },
  },
};

export default preview;
