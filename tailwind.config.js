/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/ui/ui.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'black-8': 'var(--black8)'
      }
    }
  },
  plugins: []
}
