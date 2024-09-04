/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "muted-background": "hsl(240,4.8%,95.9%)",
        "muted-foreground": "#6e6e77",
      },
    },
  },
  plugins: [],
};
