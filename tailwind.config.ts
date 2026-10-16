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
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        "accent-link": "var(--color-accent-link)",
        "accent-soft": "var(--color-accent-soft)",
        page: "var(--color-page)",
        card: "var(--color-card)",
        mint: "var(--color-mint)",
        lavender: "var(--color-lavender)",
        "pale-green": "var(--color-pale-green)",
        newsletter: "var(--color-newsletter)",
        ink: "var(--color-ink)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        "product-grey": "var(--color-product-grey)",
        star: "var(--color-star)",
        alert: "var(--color-alert)",
        "info-bar": "var(--color-info-bar)",
        track: "var(--color-track)",
        dot: "var(--color-dot)",
        danger: "var(--color-danger)",
        trash: "var(--color-trash)",
        "muted-blue": "var(--color-muted-blue)",
        "menu-active-bg": "var(--color-menu-active-bg)",
        "menu-active-text": "var(--color-menu-active-text)",
        "menu-separator": "var(--color-menu-separator)",
        "menu-chevron": "var(--color-menu-chevron)",
      },
      borderRadius: {
        card: "16px",
        section: "24px",
        accordion: "14px",
      },
      maxWidth: {
        container: "1440px",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
        script: ["var(--font-script)", "Caveat", "Kaushan Script", "cursive"],
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
