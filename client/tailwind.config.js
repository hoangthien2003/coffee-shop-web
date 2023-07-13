/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        card: "#f7dcd5",
      },
      fontFamily: {
        lobster: ["Lobster", "cursive"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
