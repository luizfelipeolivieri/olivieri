import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        floatCard: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in':   'fadeIn 0.2s ease both',
        'fade-down': 'fadeDown 0.15s ease both',
        'slide-in':  'slideIn 0.2s ease both',
        'float':     'floatCard 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
