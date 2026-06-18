import Color from 'colorjs.io';

const STOPS = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

// Lightness targets for each stop, with 500 = base color lightness.
// Values are relative offsets from base lightness, clamped to [0, 1].
const LIGHT_OFFSETS: Record<number, number> = {
  0: 0.42,
  50: 0.37,
  100: 0.31,
  200: 0.24,
  300: 0.16,
  400: 0.08,
  500: 0,
  600: -0.07,
  700: -0.14,
  800: -0.21,
  900: -0.27,
  950: -0.31,
};

function toRgbString(color: Color): string {
  const srgb = color.to('srgb');
  const r = Math.round(Math.max(0, Math.min(1, srgb.coords[0])) * 255);
  const g = Math.round(Math.max(0, Math.min(1, srgb.coords[1])) * 255);
  const b = Math.round(Math.max(0, Math.min(1, srgb.coords[2])) * 255);
  return `${r} ${g} ${b}`;
}

function buildRamp(hex: string, invert: boolean): Record<string, string> {
  const base = new Color(hex).to('oklch');
  const baseLightness = base.coords[0];

  const result: Record<string, string> = {};

  for (const stop of STOPS) {
    const offset = invert ? -LIGHT_OFFSETS[stop] : LIGHT_OFFSETS[stop];
    const lightness = Math.max(0.05, Math.min(0.98, baseLightness + offset));

    const stepped = new Color('oklch', [
      lightness,
      base.coords[1],
      base.coords[2],
    ]);

    result[String(stop)] = toRgbString(stepped);
  }

  return result;
}

export function buildColorScale(hex: string): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  return {
    light: buildRamp(hex, false),
    dark: buildRamp(hex, true),
  };
}
