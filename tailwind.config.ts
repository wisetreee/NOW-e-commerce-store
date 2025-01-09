import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main_1: "var(--main_1)",
        content_1: "var(--content_1)",
        content_2: "var(--content_2)",
        content_3: "var(--content_3)",
        content_4: "var(--content_4)",
        accent_1: "var(--accent_1)",
        accent_red: "var(--accent_red)",
        accent_green: "var(--accent_green)",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;
