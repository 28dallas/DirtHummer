/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5dc',
          400: '#99a1af',
          500: '#6a7282',
          600: '#4a5565',
          700: '#364153',
          800: '#1e2939',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
