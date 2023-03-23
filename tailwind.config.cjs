const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: {
          light: colors.stone[300],
          DEFAULT: colors.stone[300],
          dark: colors.stone[600],
        }
      },

    },
  },
  plugins: [],

}