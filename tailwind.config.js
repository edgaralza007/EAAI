/** @type {import('tailwindcss').Config} */

// Note: colors, borderRadius and boxShadow are REPLACED rather than extended.
// That is deliberate. It removes Tailwind's 22 default color ramps, every
// radius above 3px, and every drop shadow from the build — so a leftover
// `bg-slate-100`, `rounded-2xl` or `shadow-sm` from the old design simply
// stops generating and the regression is visible on screen immediately
// instead of surviving to production.

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: '#FFFFFF',
      black: '#000000',
      paper: 'rgb(var(--paper) / <alpha-value>)',
      'paper-raised': 'rgb(var(--paper-raised) / <alpha-value>)',
      ink: 'rgb(var(--ink) / <alpha-value>)',
      'ink-muted': 'rgb(var(--ink-muted) / <alpha-value>)',
      rule: 'rgb(var(--rule) / <alpha-value>)',
      accent: 'rgb(var(--accent) / <alpha-value>)',
      'accent-deep': 'rgb(var(--accent-deep) / <alpha-value>)',
      'accent-wash': 'rgb(var(--accent-wash) / <alpha-value>)',
    },

    // Editorial radii. `rounded-lg` (8px) is the sitewide standard for every
    // bordered panel, card, button and framed image — small enough to stay
    // deliberate rather than reading as a generic rounded-2xl SaaS template.
    // `rounded-xl/2xl/3xl` still don't exist, so a stray one from the old
    // design fails visibly instead of surviving.
    borderRadius: {
      none: '0',
      sm: '2px',
      DEFAULT: '2px',
      lg: '8px',
      full: '9999px',
    },

    // Depth comes from hairline rules and paper-vs-white, never from shadows.
    boxShadow: {
      none: 'none',
    },

    extend: {
      fontFamily: {
        serif: ['Instrument Serif', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: [
          'Instrument Sans Variable',
          'Instrument Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },

      fontSize: {
        // Eyebrow / tracked label size.
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },

      letterSpacing: {
        // Large serif display needs negative tracking to hold together.
        display: '-0.025em',
        // Uppercase eyebrows need the opposite.
        label: '0.14em',
      },

      lineHeight: {
        display: '0.95',
        flat: '1',
      },

      maxWidth: {
        container: '1200px',
      },

      borderColor: {
        // A bare `border` should be a hairline, not currentColor.
        DEFAULT: 'rgb(var(--rule) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
