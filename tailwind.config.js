/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        alpha: "#2e539d",
        beta: "#b09417",
        gamma: "#f8a205",
        "muted-background": "hsl(40,33%,95.9%)",
        "muted-foreground": "hsl(38,0.75%,45%)",
      },
    },
  },
  plugins: [],
};
