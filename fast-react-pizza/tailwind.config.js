/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'monospace'],
    },
    // fontSize: {
    //   huge: ['80rem'],
    // },
    extend: {
      fontSize: {
        huge: ['80rem'],
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
