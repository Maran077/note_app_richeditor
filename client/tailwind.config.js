/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-sixty": "#FED890",
        "color-thirty":"#FFA55E",
        "color-ten":"#C6DDC3"
      },
      height:{
        "menu":"60px",
        "page":"calc(100vh - 60px)"
      }
    },
  },
  plugins: [],
};
