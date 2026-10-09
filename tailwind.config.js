/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFE',
          200: '#BAE0FD',
          300: '#7DC4FB',
          400: '#38A3F6',
          500: '#0E85E7',
          600: '#0267C4',
          700: '#03529F',
          800: '#074683',
          900: '#0C3B6C',
          950: '#082548',
        },
        navy: {
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        academic: {
          blue: '#1E3A8A',
          gold: '#B45309',
          light: '#F8FAFC',
          border: '#E2E8F0',
          darkBorder: '#CBD5E1',
          text: '#1E293B',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'elevated': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.08)',
        'clay': '6px 6px 14px rgba(15, 23, 42, 0.06), -3px -3px 10px rgba(255, 255, 255, 0.95)',
        'clay-hover': '8px 8px 20px rgba(15, 23, 42, 0.09), -4px -4px 14px rgba(255, 255, 255, 1)',
        'clay-inset': 'inset 2px 2px 5px rgba(15, 23, 42, 0.08), inset -2px -2px 5px rgba(255, 255, 255, 0.8)',
        'clay-btn': '3px 3px 8px rgba(15, 23, 42, 0.12), inset 1px 1px 2px rgba(255, 255, 255, 0.4)',
        'clay-btn-active': 'inset 2px 2px 5px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
