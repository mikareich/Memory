import type { Config } from "tailwindcss";

const allColorRegex =
  /(stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)/;

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryDark: "var(--color-primary-dark)",
        primaryLight: "var(--color-primary-light)",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: new RegExp("bg-" + allColorRegex.source),
    },
    {
      pattern: new RegExp("border-" + allColorRegex.source),
    },
    {
      pattern: new RegExp("text-" + allColorRegex.source),
    },
  ],
};
export default config;
