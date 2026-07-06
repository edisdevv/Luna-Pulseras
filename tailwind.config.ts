import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crema: "#FBF3E9",
        arena: "#EFE1CC",
        terracota: {
          DEFAULT: "#C1613B",
          oscuro: "#9C4A2A",
          claro: "#E0916D",
        },
        cafe: {
          DEFAULT: "#5B4033",
          oscuro: "#3B2A22",
        },
        piedra: {
          DEFAULT: "#7C9885",
          oscuro: "#5E7767",
        },
        dorado: "#D9A441",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      borderRadius: {
        piedra: "62% 38% 55% 45% / 45% 55% 45% 55%",
      },
      boxShadow: {
        suave: "0 8px 24px -8px rgba(91, 64, 51, 0.35)",
      },
      keyframes: {
        aparecer: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        aparecer: "aparecer 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
