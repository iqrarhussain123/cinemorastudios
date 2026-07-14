import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "surface-page": "var(--surface-page)",
        "surface-card": "var(--surface-card)",
        "surface-hover": "var(--surface-hover)",
        "ink-primary": "var(--ink-primary)",
        "ink-secondary": "var(--ink-secondary)",
        "ink-muted": "var(--ink-muted)",
        "line-hairline": "var(--line-hairline)",
      },
    },
  },
  plugins: [],
};

export default config;
