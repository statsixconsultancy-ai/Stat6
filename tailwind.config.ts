import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          bg: "#f0ffe6",
          "bg-secondary": "#ddfdca",
          "bg-tertiary": "#bcfb9b",
          accent: "#5CE81B",
          dark: "#0d2f04",
          black: "#000000",
        },
        // Semantic mappings
        background: "#f0ffe6",
        foreground: "#0d2f04",
        primary: {
          DEFAULT: "#000000",
          foreground: "#f0ffe6",
        },
        secondary: {
          DEFAULT: "#ddfdca",
          foreground: "#0d2f04",
        },
        muted: {
          DEFAULT: "#ddfdca",
          foreground: "#4a7c3f",
        },
        accent: {
          DEFAULT: "#5CE81B",
          foreground: "#0d2f04",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0d2f04",
        },
        border: "#c8f0b0",
        input: "#ddfdca",
        ring: "#5CE81B",
      },
      fontFamily: {
        heading: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "display-2xl": ["4.5rem", { lineHeight: "5.625rem", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "4.5rem", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "3.75rem", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "2.75rem", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "2.375rem", letterSpacing: "-0.01em" }],
        "display-xs": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "6rem",
        "section-lg": "8rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "screen-2xl": "1440px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "soft": "0 1px 3px rgba(13, 47, 4, 0.06), 0 1px 2px rgba(13, 47, 4, 0.04)",
        "medium": "0 4px 6px -1px rgba(13, 47, 4, 0.06), 0 2px 4px -1px rgba(13, 47, 4, 0.04)",
        "card": "0 0 0 1px rgba(13, 47, 4, 0.06), 0 4px 16px rgba(13, 47, 4, 0.06)",
        "card-hover": "0 0 0 1px rgba(13, 47, 4, 0.1), 0 8px 24px rgba(13, 47, 4, 0.08)",
        "glow": "0 0 20px rgba(92, 232, 27, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(13, 47, 4, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 47, 4, 0.03) 1px, transparent 1px)",
        "dot-pattern": "radial-gradient(rgba(13, 47, 4, 0.08) 1px, transparent 1px)",
        "hero-gradient": "linear-gradient(135deg, #f0ffe6 0%, #ddfdca 50%, #f0ffe6 100%)",
      },
      backgroundSize: {
        "grid": "32px 32px",
        "dot": "20px 20px",
      },
    },
  },
  plugins: [],
};

export default config;
