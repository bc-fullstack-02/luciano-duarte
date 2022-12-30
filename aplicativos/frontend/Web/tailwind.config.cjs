/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      black: "#000000",
      white: "#ffffff",
      primary: '#3f448b',
      primaryLight: '#6c87c2',
      primaryDark: '#7565a4',
      secondary: '#7b4200',
      secondaryLight: '#a287a5',
      secondaryDark: '#392b33',
      textOnP: '#ffffff',
      textOnS: "#000000",
      error: '#B00020',
      close: '#bc7c6a',
      background: '#fafafa',
      lineBg: "#abb0eb",
      hoverBg1: '#bc7c6a',
      hoverBg2: '#d5c0d3'
    },
    extend: {
    }
  },
  plugins: [],
}