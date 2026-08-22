import { expect, it } from 'vitest';
import { cx } from '../src/lib/internal/classNames';

it('joins only present class names', () => {
  expect(cx('base', false, undefined, 'state')).toBe('base state');
});
