import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0C0C0C",
        primary: "#F5F0E8",
        body: "#8A8A8A",
        accent: "#E8C547",
      },
      fontFamily: {
        clash: ["'Clash Display'", "sans-serif"],
        sora: ["'Sora'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
