import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      animation: {
        bounce: "bounce 1s infinite",
        "bounce-delay-200": "bounce 1s infinite 0.2s",
        "bounce-delay-400": "bounce 1s infinite 0.4s",
      },
    },
    fontFamily: {
      primary: ["Roboto", "sans-serif"],
      secondary: ["Montserrat", "sans-serif"]
    },
    fontSize: {
      "vw-xl": "2.5vw",
      "vw-lg": "2vw",
      "vw-md": "1.5vw",
      "vw-sm": "1.2vw",
      "vw-xs": "1vw"
    },
    colors: {
      green: "#27AE60",
      darkGray: "#2C3E50",
      accentOrange: "#E67E22",
      lightGray: "#ECF0F1",
      offWhite: "#F5F5F5",
      softCream: "#F5F5F5"
    },
    direction: {
      rtl: "rtl"
    }
  },
  plugins: []
};
export default config;
