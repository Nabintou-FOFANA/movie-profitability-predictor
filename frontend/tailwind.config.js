/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinema-gold': '#D4AF37',
        'cinema-red': '#E50914',
        'cinema-dark': '#141414',
      },
    },
  },
  plugins: [],
}