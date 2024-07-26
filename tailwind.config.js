/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#1F1F1F',
        'cool-indigo': {
          50: ' rgb(204 210 241 / 1)',
          100: 'rgb(226 229 247 / 1)',
          200: 'rgb(204 210 241 / 1)',
          500: 'rgb(99 112 206 / 1)',
          600: 'rgb(79 85 193 / 1)',
          700: 'rgb(65 65 166 / 1)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
