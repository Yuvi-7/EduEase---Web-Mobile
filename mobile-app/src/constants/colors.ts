export const Colors = {
  scholar: {
    50: "#EDEDFC",
    100: "#D6D6F8",
    500: "#5B5BE5",
    600: "#4A4ACF",
    700: "#3939B9",
    800: "#2C2C9A",
  },
  coral: {
    50: "#FFF0EB",
    100: "#FFD9CC",
    500: "#FF8A6A",
    600: "#F07050",
    700: "#D05030",
  },
  mint: {
    50: "#E8F9F1",
    100: "#C2EED9",
    500: "#2DBA73",
    600: "#23A060",
    700: "#1A8050",
  },
  amber: {
    50: "#FEF6E4",
    100: "#FDE8B4",
    500: "#F0A52A",
    600: "#D98E18",
    700: "#B87010",
  },
  rose: {
    50: "#FDEEF1",
    100: "#F9C9D1",
    500: "#E14B6A",
    600: "#C83555",
    700: "#A82040",
  },
  purple: {
    500: "#8C5BD6",
    600: "#7A48C0",
  },
  surface: {
    page: "#FAF9F7",
    sunken: "#F2F0EC",
    card: "#FFFFFF",
  },
  line: "#E8E6E1",
  lineStrong: "#D1CEC8",
  ink: {
    1: "#1A1830",
    2: "#6B6880",
    3: "#9D9AAD",
  },
  white: "#FFFFFF",
  black: "#000000",
} as const;

// Avatar colors assigned by name's first character
export const AVATAR_COLORS = [
  Colors.scholar[500],
  Colors.coral[500],
  Colors.mint[500],
  Colors.amber[500],
  Colors.purple[500],
  Colors.rose[500],
];

export function getAvatarColor(name: string): string {
  const idx = (name.charCodeAt(0) || 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

export type PillVariant = "mint" | "amber" | "rose" | "scholar" | "coral" | "neutral";

export const PILL_STYLES: Record<PillVariant, { bg: string; text: string }> = {
  mint: { bg: Colors.mint[50], text: Colors.mint[700] },
  amber: { bg: Colors.amber[50], text: Colors.amber[700] },
  rose: { bg: Colors.rose[50], text: Colors.rose[700] },
  scholar: { bg: Colors.scholar[50], text: Colors.scholar[800] },
  coral: { bg: Colors.coral[50], text: Colors.coral[700] },
  neutral: { bg: Colors.surface.sunken, text: Colors.ink[2] },
};
