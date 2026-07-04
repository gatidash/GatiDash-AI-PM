/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'serif' is repointed to the rocketship display face so every existing
        // `font-serif` / `display-serif` usage becomes Space Grotesk automatically.
        serif: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Deep-space mission-control palette — softened for reading comfort
        paper: {
          DEFAULT: '#0C1122', // void / page background (gently lifted from pure black-navy)
          dark: '#151C31',    // raised panels
        },
        ink: {
          DEFAULT: '#D4DAE8', // softer starlight — less halation than pure white
          soft: '#AEB6CD',
        },
        smoke: '#8B92B1', // muted text
        dust: '#6A7199',  // captions / faint labels
        sand: '#28324E',  // hairline borders
        accent: {
          DEFAULT: '#F79256', // ignition — slightly warmer/softer than neon orange
          soft: '#FFB77E',
        },
        plasma: '#63CEDD', // telemetry cyan (softened)
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
