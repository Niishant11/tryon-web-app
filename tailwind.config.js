/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,js}', './index.html'],
  theme: {
    extend: {
      colors: {
        'navy': {
          50: '#f0f4f8',
          100: '#e1eaf0',
          200: '#c3d5e1',
          300: '#a5c0d2',
          400: '#87abb3',
          500: '#2c3e50',
          600: '#253545',
          700: '#1e2a39',
          800: '#161f2d',
          900: '#0f1421',
        },
        'accent': {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800',
          600: '#fb8c00',
          700: '#f57c00',
          800: '#e65100',
          900: '#bf360c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
