/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['"Inter"', 'Impact', 'sans-serif'],
      },
      letterSpacing: {
        'thonik-tight': '-0.02em',
        'thonik-mega': '-0.04em',
        'thonik-wide': '0.18em',
      },
      transitionTimingFunction: {
        'thonik-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      colors: {
        'bg-mid': '#1e293b',
        'bg-darkest': '#0f172a',
        'accent-teal': '#00c9a7',
        'accent-gold': '#e8a020',
        'ludo-red': '#d32f2f',
        'brand-yellow': '#FFD700',
        'brand-black': '#000000',
      }
    },
  },
  plugins: [],
}
