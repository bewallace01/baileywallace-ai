import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06090E",
          900: "#0A0D12",
          800: "#10141B",
          700: "#161B22",
          600: "#1E2329",
          500: "#2A3038",
        },
        paper: {
          50: "#F2EEE7",
          100: "#E5DFD4",
          200: "#CFC7B8",
          300: "#A89F8E",
          400: "#7A7468",
          500: "#54504A",
        },
        signal: {
          DEFAULT: "#E89A4F",
          50: "#FBE6CE",
          200: "#F5C794",
          400: "#E89A4F",
          600: "#C77B33",
          800: "#8E521F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Iowan Old Style", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        wider: "0.08em",
        widest: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1.2s ease-out forwards",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        "scan-line": "scan-line 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
