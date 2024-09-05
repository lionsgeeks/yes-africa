/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "alpha": "#2e539d",
        "beta": "#b09417",
        "gamma": "#f8a205",
        "muted-background": "#e5e1da",
        "muted-foreground": "#6e6e77",
      },
    },
  },
  plugins: [],
};
