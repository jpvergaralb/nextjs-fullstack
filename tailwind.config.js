/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        "cool-dark": "#0d1117",
        "cool-dark-2": "#161b22",
        "cool-dark-3": "#0f1227",
      },
    },
  },
  plugins: [],
}