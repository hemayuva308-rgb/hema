import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        border: "var(--border)",
        "border-soft": "var(--border-soft)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        white: "var(--white)",
        // sandboxed tokens for the ported AI assistant widget only
        base: {
          bg: "#F6F6FC",
          surface: "#FFFFFF",
          elevated: "#F1F2FA",
          border: "#E7E8F3",
        },
        text: {
          primary: "#1E2540",
          secondary: "#6B7290",
          muted: "#9498B0",
        },
        accent: {
          blue: "#4C6FFF",
          blueDark: "#3B57E8",
          lavender: "#E7ECFE",
          periwinkle: "#DCE4FE",
          online: "#22C55E",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        "chat-display": ["var(--font-chat-display)", "sans-serif"],
        "chat-body": ["var(--font-chat-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(76, 111, 255, 0.18)",
        card: "0 20px 60px -20px rgba(30, 37, 64, 0.18)",
        bubble: "0 1px 2px rgba(30, 37, 64, 0.04)",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        blink: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        blink: "blink 1.4s ease-in-out infinite",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.22,1,0.36,1)",
        "ease-back": "cubic-bezier(0.34,1.56,0.64,1)",
      },
    },
  },
  plugins: [],
};
export default config;
