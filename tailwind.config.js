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
        // Deep-space mission-control palette (was warm-paper editorial)
        paper: {
          DEFAULT: '#070B1A', // void / page background
          dark: '#0E1430',    // raised panels
        },
        ink: {
          DEFAULT: '#E9ECF7', // starlight (primary text)
          soft: '#C5CADF',
        },
        smoke: '#99A0C4', // muted text
        dust: '#6E769F',  // captions / faint labels
        sand: '#222C4F',  // hairline borders
        accent: {
          DEFAULT: '#FF8A3D', // ignition (rocket exhaust amber-orange)
          soft: '#FFB468',
        },
        plasma: '#5BD6E8', // telemetry cyan
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
