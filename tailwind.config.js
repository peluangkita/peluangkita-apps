/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // colors: {
      //   primary: '#3C53A4',
      // },
      colors: {
        black: '#002a65',
        white: '#ffffff',
        whitegray: '#fafafa',
        whitecustom: '#e5e8e2',
        grey: '#2e2e2e',
        tersier: '#29c5f6',
        secondary: '#3a9bdc',
        primary: '#1260cc',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate'],
  },
};
