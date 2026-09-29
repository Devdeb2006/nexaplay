/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        brand: {
          amber: '#E3A23F',
          navy: '#151827',
        },
      },
    },
  },
  plugins: [],
}