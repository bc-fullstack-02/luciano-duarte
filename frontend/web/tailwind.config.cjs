/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans:["inter", "sans-serif"],
    },
    extend: {}
  },
  plugins: [],
}