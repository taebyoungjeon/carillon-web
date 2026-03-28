import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c5a05a",
          light: "#d4b578",
          pale: "#f5ede0",
          dim: "rgba(197,160,90,0.12)",
        },
        sage: {
          DEFAULT: "#8a9a7b",
          light: "#a3b396",
        },
        ink: {
          DEFAULT: "#111111",
          soft: "#222222",
        },
        offwhite: "#f8f6f2",
      },
      fontFamily: {
        sans: ["var(--font-noto)", "sans-serif"],
        serif: ["var(--font-jakarta)", "var(--font-noto)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
