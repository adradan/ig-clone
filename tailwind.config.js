/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
      width: {
        300: '300px',
        800: '800px',
        test: 'calc(100vw - 10px)',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
      },
      height: {
        1: '1px',
        24: '24px',
        64: '64px',
        96: '96px',
        128: '128px',
        '60vh': '60vh',
        '30vh': '30vh',
        '50vh': '50vh',
        '5rem': '5rem',
        '6rem': '6rem',
      },
      transitionDuration: {
        25: '25ms',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        exposition: ['Exposition', 'sans-serif'],
      },
      fontSize: {
        '2xl': '1.75rem',
      },
    },
  },
  plugins: [],
};
