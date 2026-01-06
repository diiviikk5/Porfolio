/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00F0FF',
          purple: '#B026FF',
          pink: '#FF006E',
          yellow: '#FFD60A',
          green: '#00FF88',
          blue: '#0066FF',
        }
      }
    },
  },
  plugins: [],
}
