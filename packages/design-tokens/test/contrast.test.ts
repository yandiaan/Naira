import { describe, expect, it } from 'vitest';
import { contrastRatio, meetsContrast } from '../src/contrast';

describe('contrast tools', () => {
  it('calculates the black and white contrast ratio', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('rejects a low-contrast normal-text pair at AA', () => {
    expect(meetsContrast('#777777', '#ffffff', 'AA')).toBe(false);
  });
});
