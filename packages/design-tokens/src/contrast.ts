export type ContrastLevel = 'AA' | 'AAA';

type Rgb = readonly [number, number, number];

function parseHexColor(value: string): Rgb {
  if (!/^#[0-9a-f]{6}$/iu.test(value)) {
    throw new Error(`Expected a six-digit hex color, received: ${value}`);
  }

  return [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ];
}

function linearize(channel: number): number {
  const normalized = channel / 255;

  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(value: string): number {
  const [red, green, blue] = parseHexColor(value);

  return linearize(red) * 0.2126 + linearize(green) * 0.7152 + linearize(blue) * 0.0722;
}

export function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsContrast(
  foreground: string,
  background: string,
  level: ContrastLevel,
  largeText = false,
): boolean {
  const requiredRatio = level === 'AAA' ? (largeText ? 4.5 : 7) : largeText ? 3 : 4.5;

  return contrastRatio(foreground, background) >= requiredRatio;
}
