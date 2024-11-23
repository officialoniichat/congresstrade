/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: 'var(--color-navy-50)',
          900: 'var(--color-navy-900)',
        },
        gold: {
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
        },
      },
    },
  },
  plugins: [],
};