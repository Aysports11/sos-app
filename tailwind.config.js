module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { sos: '#DC2626', sosDark: '#B91C1C' },
      fontFamily: { sans: ['Inter', 'system-ui'] },
    },
  },
  plugins: [],
}
