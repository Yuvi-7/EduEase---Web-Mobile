/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand
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
        // Surface
        surface: {
          page: "#FAF9F7",
          sunken: "#F2F0EC",
          card: "#FFFFFF",
        },
        // Borders
        line: "#E8E6E1",
        "line-strong": "#D1CEC8",
        // Text
        ink: {
          1: "#1A1830",
          2: "#6B6880",
          3: "#9D9AAD",
        },
      },
      fontFamily: {
        display: ["SpaceGrotesk-SemiBold"],
        "display-bold": ["SpaceGrotesk-Bold"],
        body: ["Inter-Regular"],
        "body-medium": ["Inter-Medium"],
        "body-semibold": ["Inter-SemiBold"],
        "body-bold": ["Inter-Bold"],
        mono: ["JetBrainsMono-Regular"],
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
        btn: "14px",
        roster: "12px",
      },
    },
  },
  plugins: [],
};
