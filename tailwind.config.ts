import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        card: "12px",
      },
      boxShadow: {
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.08)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.08)",
        none: "none",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          2: "hsl(var(--surface-2))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-muted": "hsl(var(--text-muted))",
        "border-strong": "hsl(var(--border-strong))",
        "blue-brand": {
          DEFAULT: "hsl(var(--blue))",
          dark: "hsl(var(--blue-dark))",
          bg: "hsl(var(--blue-bg))",
        },
        green: {
          DEFAULT: "hsl(var(--green))",
          bg: "hsl(var(--green-bg))",
        },
        amber: {
          DEFAULT: "hsl(var(--amber))",
          bg: "hsl(var(--amber-bg))",
        },
        red: {
          DEFAULT: "hsl(var(--red))",
        },
        navy: "hsl(var(--navy))",
        blue: "hsl(var(--blue))",
        gold: "hsl(var(--gold))",
        ice: "hsl(var(--ice))",
        cream: "hsl(var(--cream))",
        "text-dark": "hsl(var(--text-dark))",
        "text-mid": "hsl(var(--text-mid))",
        "text-light": "hsl(var(--text-light))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        "verified-bg": "hsl(var(--green-bg))",
      },
      transitionDuration: {
        hover: "150ms",
        state: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
