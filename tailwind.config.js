/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Outfit"', '"Plus Jakarta Sans"', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['"Outfit"', '"Inter"', 'Impact', 'sans-serif'],
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
        /* ─── Brand Core ─── */
        'brand-yellow': '#FACC15',
        'brand-yellow-hot': '#FFE600',
        'brand-black': '#000000',
        'brand-slate': '#111827',
        /* ─── Legacy Mapped ─── */
        'bg-mid': '#1E293B',
        'bg-darkest': '#0F172A',
        'bg-deep': '#0A0A0A',
        'bg-card': '#111827',
        'bg-panel': '#0D0D0D',
        'accent-teal': '#00f0c2',
        'accent-gold': '#FACC15',
        'ludo-red': '#D32F2F',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
