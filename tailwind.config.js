/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
  future: {
    hoverOnlyWhenSupported: true,
  }
}