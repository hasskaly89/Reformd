import type { Config } from "tailwindcss";

/**
 * Brand palette (per Reformd Brand Guidelines 2025):
 *   Reformd Earth     #4f3e33  (primary)
 *   Reformd Concrete  #bfb8a8  (primary)
 *   Earth Dark        #5e4b40  (secondary)
 *   Concrete Light    #cec6ba  (secondary)
 *
 * `cement` and `brown` retained as aliases so existing classes
 * (bg-cement-50, text-brown/60, etc.) keep working — just remapped
 * onto the brand colours.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand-named (use these going forward)
        earth: {
          DEFAULT: "#4f3e33",
          dark: "#5e4b40",
        },
        concrete: {
          DEFAULT: "#bfb8a8",
          light: "#cec6ba",
        },
        cream: "#F5F0E8",
        charcoal: "#2A2520",

        // Tailwind-style scales remapped to brand palette
        cement: {
          DEFAULT: "#bfb8a8",
          50: "#f5f0e8",
          100: "#cec6ba",
          200: "#bfb8a8",
          300: "#a89e8b",
          400: "#8e8270",
          500: "#736756",
          600: "#5b5246",
          700: "#5e4b40",
          800: "#4f3e33",
          900: "#2a2520",
        },
        brown: {
          DEFAULT: "#4f3e33",
          50: "#e8dcd0",
          100: "#cdb6a0",
          200: "#b08f72",
          300: "#906c4e",
          400: "#5e4b40",
          500: "#4f3e33",
          600: "#3a2d24",
          700: "#251c17",
          800: "#1a1310",
          900: "#0e0b08",
        },
      },
      fontFamily: {
        display: ['"roc-grotesk-wide"', "var(--font-display-fallback)", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "-0.01em",
        wider: "0.05em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
