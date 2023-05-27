const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/app/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
  extend: {
    fontFamily: {
      Inter: ['Inter', 'sans-serif'],
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    plugins: [
      require('tailwind-scrollbar')({ nocompatible: true }),
      plugin(({ addUtilities }) =>
        addUtilities({
          '.scrollbar-imob::-webkit-scrollbar': {
            width: '0.375rem !important',
            height: '0.375rem !important',
          },
          '.scrollbar-imob::-webkit-scrollbar-thumb': {
            backgroundColor: '#E6E6E6 !important',
            borderRadius: '0.125rem !important',
          },
          '.scrollbar-imob::-webkit-scrollbar-track:vertical': {
            background: 'transparent !important',
          },
          '.scrollbar-imob::-webkit-scrollbar-track:horizontal': {
            background: 'transparent !important',
          },
        })
      ),
    ],
  },
}
export const plugins = []
