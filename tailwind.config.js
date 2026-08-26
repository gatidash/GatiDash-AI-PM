/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Fraunces (editorial serif w/ optical sizing) for display + headings;
        // Hanken Grotesk (clean neutral sans) for body, UI and labels.
        serif: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        grotesk: ['Hanken Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Hanken Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Hanken Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // All colors are CSS-variable backed so light/dark flips in one place.
      colors: {
        paper: {
          DEFAULT: 'rgb(var(--paper) / <alpha-value>)',
          dark: 'rgb(var(--paper-dark) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)',
        },
        smoke: 'rgb(var(--smoke) / <alpha-value>)',
        dust: 'rgb(var(--dust) / <alpha-value>)',
        sand: 'rgb(var(--sand) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
        },
        // Neon lime — the constant primary highlight (same in both modes)
        lime: 'rgb(var(--lime) / <alpha-value>)',
        plasma: 'rgb(var(--plasma) / <alpha-value>)',
      },
      letterSpacing: {
        'editorial': '-0.018em',
        'wide-caps': '0.16em',
      },
      maxWidth: {
        'prose-tight': '38rem',
        'prose-wide': '52rem',
      },
    },
  },
  plugins: [],
}
