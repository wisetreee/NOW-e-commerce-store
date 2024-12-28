import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    maxWidth: {
      '7xl': '95rem',
      // Add more custom values as needed
    },
    extend: {
      colors: {
        main_white: "#FFFFFF",
        content_black: "#1C1D24",
        content_light_gray: "#F2F2F2",
        content_gray: "#AEAEAE",
        content_dark_gray: "#8E8E8E",
        accent_orange: "#FFBB4D",
        accent_red: "#A72020",
        accent_green: "#1F6E12",
      },
    },
  },
  plugins: [],
} satisfies Config;
