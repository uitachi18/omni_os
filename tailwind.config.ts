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
        obsidian: "#0B0C10",
        "obsidian-2": "#0F1117",
        "obsidian-3": "#13151E",
        "glass-border": "rgba(255,255,255,0.08)",
        "neon-cyan": "#00F5FF",
        "neon-magenta": "#FF00FF",
        "neon-blue": "#4D79FF",
        "neon-purple": "#8B5CF6",
        "neon-green": "#00FF88",
        "panel-bg": "rgba(15, 17, 23, 0.72)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
          "95%": { opacity: "0.5" },
          "96%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "flow-right": {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" },
        },
        "particle-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-60px) scale(0)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        breathe: "breathe 3s ease-in-out infinite",
        flicker: "flicker 5s linear infinite",
        float: "float 4s ease-in-out infinite",
        "flow-right": "flow-right 2s linear infinite",
        "particle-rise": "particle-rise 1.2s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 1.5s cubic-bezier(0.2, 0.8, 0.5, 1) infinite",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        scanline: "scanline 6s linear infinite",
      },
      backgroundImage: {
        "radial-cyan":
          "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 60%)",
        "radial-magenta":
          "radial-gradient(circle, rgba(255,0,255,0.12) 0%, transparent 60%)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.15) 50%, transparent 100%)",
      },
      boxShadow: {
        "neon-cyan":
          "0 0 20px rgba(0,245,255,0.4), 0 0 60px rgba(0,245,255,0.1)",
        "neon-magenta":
          "0 0 20px rgba(255,0,255,0.4), 0 0 60px rgba(255,0,255,0.1)",
        "neon-blue":
          "0 0 20px rgba(77,121,255,0.4), 0 0 60px rgba(77,121,255,0.1)",
        glass:
          "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
