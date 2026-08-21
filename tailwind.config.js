/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ffe8e8',
          100: '#ffc9c9',
          200: '#ff9b9b',
          300: '#ff6b6b',
          400: '#f23030',
          500: '#E10600',
          600: '#c10500',
          700: '#8f0400',
          800: '#5c0300',
          900: '#3a0200',
        },
        ink: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#111111',
          800: '#161616',
          700: '#1f1f1f',
          footer: '#030303',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
