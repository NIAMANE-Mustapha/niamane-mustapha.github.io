/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: 'var(--bg-dark)',
        primary: {
          DEFAULT: 'var(--primary)',
          glow: 'var(--primary-glow)',
        },
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        textMain: 'var(--text-main)',
        textMuted: 'var(--text-muted)',
        borderGlass: 'var(--border-glass)',
        borderGlow: 'var(--border-glow)',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
